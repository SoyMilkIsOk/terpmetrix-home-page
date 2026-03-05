import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Grid configuration
const GRID_SPACING = 30;
const GRID_LINE_BASE_ALPHA = 0.08;
const INFLUENCE_RADIUS = 300;
const INFLUENCE_RADIUS_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;
const MAX_DISPLACEMENT = 14;
const LERP_SPEED = 0.08;
const POINT_LERP = 0.12;

// Mobile config
const MOBILE_BULGE_COUNT = 3;
const MOBILE_BULGE_RADIUS = 180;
const MOBILE_BULGE_RADIUS_SQ = MOBILE_BULGE_RADIUS * MOBILE_BULGE_RADIUS;
const MOBILE_MAX_DISPLACEMENT = 12;

// Pre-computed for displacement falloff: distSq > rSq * 4 is the cutoff
const DESKTOP_CUTOFF_SQ = INFLUENCE_RADIUS_SQ * 4;
const MOBILE_CUTOFF_SQ = MOBILE_BULGE_RADIUS_SQ * 4;

// Overfill: extend canvas beyond section bounds so the gradient fade
// happens outside the visible area. overflow:hidden on the section clips it.
const OVERFILL = 200;

const Intro = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentMouseRef = useRef({ x: -1000, y: -1000 });
  const isMobileRef = useRef(false);
  const bulgePointsRef = useRef([]);
  const gridDataRef = useRef(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const dprRef = useRef(1);

  // Build grid data (points arrays for horizontal and vertical lines)
  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const w = rect.width;
    const h = rect.height;
    dimensionsRef.current = { width: w, height: h };

    // Canvas is oversized by OVERFILL on each side; CSS positions it at -OVERFILL
    const cw = w + OVERFILL * 2;
    const ch = h + OVERFILL * 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;

    // Build point arrays across the oversized area
    // Coordinates are in canvas-local space (0,0 = top-left of oversized canvas)
    const horizontalLines = [];
    for (let y = 0; y <= ch; y += GRID_SPACING) {
      const points = [];
      for (let x = 0; x <= cw; x += GRID_SPACING) {
        points.push({ ox: x, oy: y, cx: x, cy: y });
      }
      horizontalLines.push(points);
    }

    const verticalLines = [];
    for (let x = 0; x <= cw; x += GRID_SPACING) {
      const points = [];
      for (let y = 0; y <= ch; y += GRID_SPACING) {
        points.push({ ox: x, oy: y, cx: x, cy: y });
      }
      verticalLines.push(points);
    }

    gridDataRef.current = { horizontal: horizontalLines, vertical: verticalLines };
  }, []);

  // Displacement function (inlined for performance in the hot loop,
  // but kept here as the reference implementation)
  const displace = (px, py, gx, gy, radiusSq, halfRadiusSq, cutoffSq, maxDisp) => {
    const dx = px - gx;
    const dy = py - gy;
    const distSq = dx * dx + dy * dy;
    if (distSq > cutoffSq) return 0; // return 0 = no displacement
    const dist = Math.sqrt(distSq);
    if (dist < 1) return 0;
    const strength = maxDisp * Math.exp(-distSq / halfRadiusSq);
    return { dx: (dx / dist) * strength, dy: (dy / dist) * strength };
  };

  // Initialize mobile bulge points
  const initBulgePoints = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    if (!width || !height) return;
    const points = [];
    for (let i = 0; i < MOBILE_BULGE_COUNT; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        strength: 0,
        targetStrength: Math.random() * 0.6 + 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    bulgePointsRef.current = points;
  }, []);

  // Draw a smooth curve through points using quadratic bezier (Catmull-Rom style)
  // Draws directly on the canvas context - no string building
  const drawSmoothLine = (ctx, points) => {
    const len = points.length;
    if (len < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].cx, points[0].cy);

    if (len === 2) {
      ctx.lineTo(points[1].cx, points[1].cy);
      ctx.stroke();
      return;
    }

    // First segment
    const mid0x = (points[0].cx + points[1].cx) * 0.5;
    const mid0y = (points[0].cy + points[1].cy) * 0.5;
    ctx.quadraticCurveTo(points[0].cx, points[0].cy, mid0x, mid0y);

    // Middle segments
    for (let i = 1; i < len - 1; i++) {
      const midX = (points[i].cx + points[i + 1].cx) * 0.5;
      const midY = (points[i].cy + points[i + 1].cy) * 0.5;
      ctx.quadraticCurveTo(points[i].cx, points[i].cy, midX, midY);
    }

    // Last segment
    const last = points[len - 1];
    ctx.lineTo(last.cx, last.cy);
    ctx.stroke();
  };

  // Animation loop
  const animate = useCallback(() => {
    const gridData = gridDataRef.current;
    if (!gridData) {
      animFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      animFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const ctx = canvas.getContext('2d');
    const { width: w, height: h } = dimensionsRef.current;
    const cw = w + OVERFILL * 2;
    const ch = h + OVERFILL * 2;
    const dpr = dprRef.current;
    const isMobile = isMobileRef.current;

    if (!isMobile) {
      // Desktop: lerp current mouse toward target
      currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * LERP_SPEED;
      currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * LERP_SPEED;
    }

    // Mobile: animate bulge points (drift + pulse)
    if (isMobile) {
      const now = performance.now() * 0.001;
      const bulges = bulgePointsRef.current;
      for (let i = 0; i < bulges.length; i++) {
        const bp = bulges[i];
        bp.x += (bp.targetX - bp.x) * 0.005;
        bp.y += (bp.targetY - bp.y) * 0.005;

        const ddx = bp.targetX - bp.x;
        const ddy = bp.targetY - bp.y;
        if (ddx * ddx + ddy * ddy < 400) {
          bp.targetX = Math.random() * w;
          bp.targetY = Math.random() * h;
        }

        bp.strength = bp.targetStrength * (0.5 + 0.5 * Math.sin(now * 0.8 + bp.phase));
      }
    }

    // Mouse coords are in section-local space; offset to canvas-local space
    const mx = currentMouseRef.current.x + OVERFILL;
    const my = currentMouseRef.current.y + OVERFILL;
    const halfRadSqDesktop = INFLUENCE_RADIUS_SQ * 0.5;
    const halfRadSqMobile = MOBILE_BULGE_RADIUS_SQ * 0.5;
    const allLines = [...gridData.horizontal, ...gridData.vertical];

    for (let li = 0; li < allLines.length; li++) {
      const points = allLines[li];
      for (let pi = 0; pi < points.length; pi++) {
        const pt = points[pi];
        let totalDx = 0;
        let totalDy = 0;

        if (!isMobile) {
          // Desktop: single mouse gravity well
          const dx = pt.ox - mx;
          const dy = pt.oy - my;
          const distSq = dx * dx + dy * dy;
          if (distSq <= DESKTOP_CUTOFF_SQ && distSq >= 1) {
            const dist = Math.sqrt(distSq);
            const strength = MAX_DISPLACEMENT * Math.exp(-distSq / halfRadSqDesktop);
            totalDx = (dx / dist) * strength;
            totalDy = (dy / dist) * strength;
          }
        } else {
          // Mobile: multiple phantom bulge points
          const bulges = bulgePointsRef.current;
          for (let bi = 0; bi < bulges.length; bi++) {
            const bp = bulges[bi];
            const dx = pt.ox - bp.x;
            const dy = pt.oy - bp.y;
            const distSq = dx * dx + dy * dy;
            if (distSq <= MOBILE_CUTOFF_SQ && distSq >= 1) {
              const dist = Math.sqrt(distSq);
              const maxDisp = MOBILE_MAX_DISPLACEMENT * bp.strength;
              const strength = maxDisp * Math.exp(-distSq / halfRadSqMobile);
              totalDx += (dx / dist) * strength;
              totalDy += (dy / dist) * strength;
            }
          }
        }

        // Lerp toward target displacement
        const newX = pt.ox + totalDx;
        const newY = pt.oy + totalDy;
        pt.cx += (newX - pt.cx) * POINT_LERP;
        pt.cy += (newY - pt.cy) * POINT_LERP;
      }
    }

    // --- Draw to canvas ---
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    // Draw all lines then mask with a radial gradient
    ctx.lineWidth = 0.5;
    ctx.lineCap = 'round';

    if (!isMobile) {
      // Desktop: draw lines with proximity-based brightness
      const highlightRadius = INFLUENCE_RADIUS * 2.5;
      const highlightRadiusSq = highlightRadius * highlightRadius;

      for (let li = 0; li < allLines.length; li++) {
        const points = allLines[li];

        // Find closest point to mouse for this line
        let minDistSq = Infinity;
        for (let pi = 0; pi < points.length; pi++) {
          const ddx = points[pi].ox - mx;
          const ddy = points[pi].oy - my;
          const dsq = ddx * ddx + ddy * ddy;
          if (dsq < minDistSq) minDistSq = dsq;
        }

        if (minDistSq < highlightRadiusSq) {
          const minDist = Math.sqrt(minDistSq);
          const t = 1 - minDist / highlightRadius;
          const alpha = GRID_LINE_BASE_ALPHA + t * 0.14;
          ctx.strokeStyle = `rgba(16,185,129,${alpha})`;
          ctx.lineWidth = 0.5 + t * 0.7;
        } else {
          ctx.strokeStyle = `rgba(16,185,129,${GRID_LINE_BASE_ALPHA})`;
          ctx.lineWidth = 0.5;
        }

        drawSmoothLine(ctx, points);
      }

      // Update mouse glow position (section-local coords, not canvas-local)
      if (glowRef.current) {
        glowRef.current.style.setProperty('--mouse-x', `${mx - OVERFILL}px`);
        glowRef.current.style.setProperty('--mouse-y', `${my - OVERFILL}px`);
      }
    } else {
      // Mobile: all lines same color
      ctx.strokeStyle = `rgba(16,185,129,${GRID_LINE_BASE_ALPHA})`;
      for (let li = 0; li < allLines.length; li++) {
        drawSmoothLine(ctx, allLines[li]);
      }
    }

    // Apply radial gradient fade mask centered on the visible section area
    ctx.globalCompositeOperation = 'destination-in';
    const gcx = cw * 0.5;
    const gcy = ch * 0.5;
    const maxR = Math.sqrt(gcx * gcx + gcy * gcy);
    const grad = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, maxR);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.5, 'rgba(255,255,255,1)');
    grad.addColorStop(0.8, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1.0, 'rgba(255,255,255,0.2)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    ctx.restore();

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      if (!sectionRef.current || isMobileRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const checkMobile = () => {
      isMobileRef.current = window.matchMedia('(hover: none)').matches || window.innerWidth < 768;
    };

    const handleResize = () => {
      checkMobile();
      buildGrid();
      if (isMobileRef.current) {
        initBulgePoints();
      }
    };

    checkMobile();
    
    // Build grid after mount
    requestAnimationFrame(() => {
      buildGrid();
      if (isMobileRef.current) {
        initBulgePoints();
      }
    });

    // Start animation
    animFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (section) {
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [buildGrid, initBulgePoints, animate]);

  return (
    <section className="intro-section" ref={sectionRef}>
      {/* Animated background orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* Canvas Grid with Gravity Well */}
      <div className="grid-wrapper">
        <canvas
          ref={canvasRef}
          className="grid-canvas"
        />
        <div ref={glowRef} className="mouse-glow"></div>
      </div>
      
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="intro-content">
              <div className="badge-tag">Cannabis Technology Platform</div>
              <h1>Advancing Cannabis Through Innovation & Technology</h1>
              <p className="lead">
                Terpmetrix builds purpose-driven tools, services, and digital solutions that elevate the cannabis experience, 
                from precision accessories to professional-grade photography and industry-focused web development.
              </p>
              <div className="intro-buttons">
                <Link href="/projects" className="btn btn-primary btn-lg">
                  Explore Our Projects
                </Link>
                <Link href="/contact" className="btn btn-glass btn-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div 
              className="intro-image"
              style={{
                "--scroll-y": scrollY,
                "--glow-opacity": Math.min(0.7, 0.15 + scrollY * 0.0015),
                "--glow-spread": `${40 + scrollY * 0.2}px`,
              }}
            >
              <Image width={1000} height={500} src="/images/hero.png" alt="Cannabis Technology" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .intro-section {
          padding: 180px 0 120px;
          position: relative;
          overflow: hidden;
          background: var(--dark-bg);
        }
        
        /* Animated gradient orbs */
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }
        
        .orb-1 {
          width: 400px;
          height: 400px;
          background: var(--primary-glow-strong);
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(59, 130, 246, 0.12);
          bottom: -50px;
          left: -80px;
          animation-delay: -3s;
        }
        
        .orb-3 {
          width: 200px;
          height: 200px;
          background: rgba(16, 185, 129, 0.08);
          top: 50%;
          left: 50%;
          animation-delay: -5s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        /* Canvas Grid Background */
        .grid-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .grid-canvas {
          position: absolute;
          top: -200px;
          left: -200px;
        }

        .mouse-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(
              circle 250px at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
              rgba(16, 185, 129, 0.15) 0%,
              rgba(16, 185, 129, 0.06) 50%,
              transparent 100%
            ),
            radial-gradient(
              circle 80px at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
              rgba(16, 185, 129, 0.12) 0%,
              transparent 100%
            );
          pointer-events: none;
        }

        
        .badge-tag {
          display: inline-block;
          padding: 6px 16px;
          background: var(--primary-glow);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 50px;
          color: var(--primary);
          font-size: 13px;
          font-weight: 600;
          font-family: var(--font-body);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        
        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          font-family: var(--font-heading);
          background: linear-gradient(135deg, #ffffff 0%, #10B981 50%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .lead {
          font-size: 1.15rem;
          margin-bottom: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          font-family: var(--font-body);
        }
        
        .intro-buttons {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }
        
        .intro-buttons :global(.btn-primary) {
          padding: 14px 32px;
          font-weight: 600;
          font-family: var(--font-body);
          border-radius: 10px;
          box-shadow: 0 4px 20px var(--primary-glow-strong);
        }

        .intro-buttons :global(.btn-glass) {
          padding: 14px 32px;
          font-weight: 600;
          font-family: var(--font-body);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .intro-buttons :global(.btn-glass:hover) {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          color: #fff;
        }
        
        .intro-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--dark-border);
          transform: translateY(calc(var(--scroll-y, 0) * 0.014px));
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 var(--glow-spread, 40px) rgba(16, 185, 129, var(--glow-opacity, 0.15));
          transition: transform 0.2s cubic-bezier(0.1, 0, 0.1, 1), box-shadow 0.2s cubic-bezier(0.1, 0, 0.1, 1);
          will-change: transform, box-shadow;
        }
        
        .intro-image:hover {
          transform: translateY(calc((var(--scroll-y, 0) * 0.014px) - 8px));
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 calc(var(--glow-spread, 40px) + 20px) rgba(16, 185, 129, calc(var(--glow-opacity, 0.15) + 0.2));
        }
        
        @media (max-width: 991px) {
          .intro-section {
            padding: 150px 0 80px;
          }
          
          h1 {
            font-size: 2.5rem;
          }
          
          .intro-content {
            margin-bottom: 50px;
            text-align: center;
          }

          .badge-tag {
            margin-left: auto;
            margin-right: auto;
          }
          
          .intro-buttons {
            justify-content: center;
          }
        }
        
        @media (max-width: 576px) {
          h1 {
            font-size: 2rem;
          }

          .intro-section {
            padding: 130px 0 60px;
          }
          
          .intro-buttons {
            flex-direction: column;
            align-items: center;
          }

          .intro-buttons :global(.btn) {
            width: auto;
            min-width: 220px;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Intro;