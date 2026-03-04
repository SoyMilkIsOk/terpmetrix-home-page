import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Grid configuration
const GRID_SPACING = 30;
const GRID_LINE_COLOR = 'rgba(16, 185, 129, 0.08)';
const GRID_LINE_COLOR_BRIGHT = 'rgba(16, 185, 129, 0.25)';
const INFLUENCE_RADIUS = 300;
const MAX_DISPLACEMENT = 14;
const LERP_SPEED = 0.08;

// Mobile config
const MOBILE_BULGE_COUNT = 3;
const MOBILE_BULGE_RADIUS = 180;
const MOBILE_MAX_DISPLACEMENT = 12;
const MOBILE_DRIFT_SPEED = 0.9; // px per frame

const Intro = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const glowRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentMouseRef = useRef({ x: -1000, y: -1000 });
  const isMobileRef = useRef(false);
  const bulgePointsRef = useRef([]);
  const linesRef = useRef({ horizontal: [], vertical: [] });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Build SVG grid lines
  const buildGrid = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const w = rect.width;
    const h = rect.height;
    dimensionsRef.current = { width: w, height: h };

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);

    // Clear existing lines
    while (svg.lastChild) {
      if (svg.lastChild.tagName !== 'defs') {
        svg.removeChild(svg.lastChild);
      } else {
        break;
      }
    }

    const hLines = [];
    const vLines = [];

    // Horizontal lines
    for (let y = 0; y <= h; y += GRID_SPACING) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 0);
      line.setAttribute('y1', y);
      line.setAttribute('x2', w);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', GRID_LINE_COLOR);
      line.setAttribute('stroke-width', '0.5');
      line.setAttribute('data-oy', y);
      svg.appendChild(line);
      hLines.push({ el: line, oy: y, segments: Math.ceil(w / GRID_SPACING) });
    }

    // Vertical lines
    for (let x = 0; x <= w; x += GRID_SPACING) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x);
      line.setAttribute('y1', 0);
      line.setAttribute('x2', x);
      line.setAttribute('y2', h);
      line.setAttribute('stroke', GRID_LINE_COLOR);
      line.setAttribute('stroke-width', '0.5');
      line.setAttribute('data-ox', x);
      svg.appendChild(line);
      vLines.push({ el: line, ox: x, segments: Math.ceil(h / GRID_SPACING) });
    }

    // Replace lines with smooth path elements for organic distortion
    const newHLines = [];
    hLines.forEach(({ oy }) => {
      const points = [];
      for (let x = 0; x <= w; x += GRID_SPACING) {
        points.push({ ox: x, oy, cx: x, cy: oy });
      }
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', GRID_LINE_COLOR);
      path.setAttribute('stroke-width', '0.5');
      path.setAttribute('d', pointsToSmoothPath(points));
      svg.appendChild(path);
      newHLines.push({ el: path, points });
    });

    const newVLines = [];
    vLines.forEach(({ ox }) => {
      const points = [];
      for (let y = 0; y <= h; y += GRID_SPACING) {
        points.push({ ox, oy: y, cx: ox, cy: y });
      }
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', GRID_LINE_COLOR);
      path.setAttribute('stroke-width', '0.5');
      path.setAttribute('d', pointsToSmoothPath(points));
      svg.appendChild(path);
      newVLines.push({ el: path, points });
    });

    // Remove the simple lines, keep only smooth paths
    hLines.forEach(l => l.el.remove());
    vLines.forEach(l => l.el.remove());

    linesRef.current = { horizontal: newHLines, vertical: newVLines };
  }, []);

  // Convert displaced points to a smooth SVG path using Catmull-Rom-style curves
  const pointsToSmoothPath = (points) => {
    if (points.length < 2) return '';
    if (points.length === 2) {
      return `M${points[0].cx.toFixed(1)},${points[0].cy.toFixed(1)} L${points[1].cx.toFixed(1)},${points[1].cy.toFixed(1)}`;
    }
    
    let d = `M${points[0].cx.toFixed(1)},${points[0].cy.toFixed(1)}`;
    
    // First segment: quadratic curve to midpoint of first two points
    const mid0x = (points[0].cx + points[1].cx) / 2;
    const mid0y = (points[0].cy + points[1].cy) / 2;
    d += ` Q${points[0].cx.toFixed(1)},${points[0].cy.toFixed(1)} ${mid0x.toFixed(1)},${mid0y.toFixed(1)}`;
    
    // Middle segments: smooth quadratic curves through midpoints, using vertices as control points
    for (let i = 1; i < points.length - 1; i++) {
      const midX = (points[i].cx + points[i + 1].cx) / 2;
      const midY = (points[i].cy + points[i + 1].cy) / 2;
      d += ` Q${points[i].cx.toFixed(1)},${points[i].cy.toFixed(1)} ${midX.toFixed(1)},${midY.toFixed(1)}`;
    }
    
    // Last segment: line to final point
    const last = points[points.length - 1];
    d += ` T${last.cx.toFixed(1)},${last.cy.toFixed(1)}`;
    
    return d;
  };

  // Displacement function for a single point given a gravity source
  const displace = (px, py, gx, gy, radius, maxDisp) => {
    const dx = px - gx;
    const dy = py - gy;
    const distSq = dx * dx + dy * dy;
    const rSq = radius * radius;
    if (distSq > rSq * 4) return { dx: 0, dy: 0 };
    const dist = Math.sqrt(distSq);
    if (dist < 1) return { dx: 0, dy: 0 };
    const strength = maxDisp * Math.exp(-distSq / (rSq * 0.5));
    return {
      dx: (dx / dist) * strength,
      dy: (dy / dist) * strength,
    };
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

  // Animation loop
  const animate = useCallback(() => {
    const { horizontal, vertical } = linesRef.current;
    if (!horizontal.length && !vertical.length) {
      animFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const isMobile = isMobileRef.current;

    if (!isMobile) {
      // Desktop: lerp current mouse toward target
      currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * LERP_SPEED;
      currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * LERP_SPEED;
    }

    // Mobile: animate bulge points (drift + pulse)
    if (isMobile) {
      const now = performance.now() / 1000;
      bulgePointsRef.current.forEach(bp => {
        // Drift toward target
        bp.x += (bp.targetX - bp.x) * 0.005;
        bp.y += (bp.targetY - bp.y) * 0.005;

        // If close to target, pick new target
        const driftDist = Math.sqrt((bp.targetX - bp.x) ** 2 + (bp.targetY - bp.y) ** 2);
        if (driftDist < 20) {
          bp.targetX = Math.random() * dimensionsRef.current.width;
          bp.targetY = Math.random() * dimensionsRef.current.height;
        }

        // Pulse strength
        bp.strength = bp.targetStrength * (0.5 + 0.5 * Math.sin(now * 0.8 + bp.phase));
      });
    }

    // Compute displacement for all polyline points
    const allPolylines = [...horizontal, ...vertical];

    allPolylines.forEach(({ el, points }) => {
      let changed = false;
      points.forEach(pt => {
        let totalDx = 0;
        let totalDy = 0;

        if (!isMobile) {
          // Desktop: single mouse gravity well
          const d = displace(
            pt.ox, pt.oy,
            currentMouseRef.current.x, currentMouseRef.current.y,
            INFLUENCE_RADIUS, MAX_DISPLACEMENT
          );
          totalDx += d.dx;
          totalDy += d.dy;
        } else {
          // Mobile: multiple phantom bulge points
          bulgePointsRef.current.forEach(bp => {
            const d = displace(
              pt.ox, pt.oy,
              bp.x, bp.y,
              MOBILE_BULGE_RADIUS, MOBILE_MAX_DISPLACEMENT * bp.strength
            );
            totalDx += d.dx;
            totalDy += d.dy;
          });
        }

        // Lerp toward target displacement
        const newX = pt.ox + totalDx;
        const newY = pt.oy + totalDy;
        pt.cx += (newX - pt.cx) * 0.12;
        pt.cy += (newY - pt.cy) * 0.12;

        if (Math.abs(pt.cx - pt.ox) > 0.01 || Math.abs(pt.cy - pt.oy) > 0.01) {
          changed = true;
        }
      });

      if (changed) {
        el.setAttribute('d', pointsToSmoothPath(points));
      }
    });

    // Update line colors near mouse on desktop
    if (!isMobile) {
      const mx = currentMouseRef.current.x;
      const my = currentMouseRef.current.y;
      allPolylines.forEach(({ el, points }) => {
        // Check if any point is near mouse
        let minDist = Infinity;
        points.forEach(pt => {
          const d = Math.sqrt((pt.ox - mx) ** 2 + (pt.oy - my) ** 2);
          if (d < minDist) minDist = d;
        });
        const t = Math.max(0, 1 - minDist / (INFLUENCE_RADIUS * 2.5));
        if (t > 0.01) {
          const alpha = 0.08 + t * 0.14;
          el.setAttribute('stroke', `rgba(16, 185, 129, ${alpha.toFixed(3)})`);
          el.setAttribute('stroke-width', `${0.5 + t * 0.7}`);
        } else {
          el.setAttribute('stroke-width', '0.5');
          el.setAttribute('stroke', GRID_LINE_COLOR);
        }
      });

      // Update mouse glow position
      if (glowRef.current) {
        glowRef.current.style.setProperty('--mouse-x', `${mx}px`);
        glowRef.current.style.setProperty('--mouse-y', `${my}px`);
      }
    }

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

      {/* SVG Grid with Gravity Well */}
      <div className="grid-wrapper">
        <svg
          ref={svgRef}
          className="grid-svg"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="gridFade" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.6" />
              <stop offset="90%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#gridFade)" />
            </mask>
          </defs>
        </svg>
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

        /* SVG Grid Background */
        .grid-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .grid-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          mask: url(#gridMask);
          -webkit-mask: url(#gridMask);
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