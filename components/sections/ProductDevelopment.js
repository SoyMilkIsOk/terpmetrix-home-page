import Link from "next/link";
import Image from "next/image";

const ProductDevelopment = () => {
  const products = [
    {
      id: 1,
      title: "TerpFocus",
      description:
        "TerpFocus delivers professional cannabis photography, from detailed macro shots of flower and concentrates to lifestyle imagery that captures your brand's identity. Built for dispensaries, processors, and brands that demand visual excellence.",
      image: "/images/terpfocus.jpg",
      link: "/projects#terpfocus",
      icon: "fas fa-camera",
    },
    {
      id: 2,
      title: "TerpScoops",
      description:
        "With thousands of units sold, TerpScoops has become the go-to precision dosing and packing tool for quality-conscious cannabis consumers. Compact, durable, and ergonomically crafted for consistency and ease of use.",
      image: "/images/terpscoops.jpg",
      link: "/projects#terpscoops",
      icon: "fas fa-prescription-bottle",
    },
    {
      id: 3,
      title: "TerpForge",
      description:
        "TerpForge is a cannabis-industry web development and digital branding studio. We help dispensaries, cultivators, and ancillary brands build high-performance, compliance-ready websites with a focus on conversion, SEO, and seamless user experience.",
      image: "/images/terpforge.jpg",
      link: "/projects#terpforge",
      icon: "fas fa-code",
    },
  ];

  return (
    <section className="product-development-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center" data-aos="fade-up">
            <h2 className="section-heading">Our Ecosystem</h2>
            <p className="section-subheading">
              From hands-on accessories to digital services, each Terpmetrix product and service
              is designed to solve a real need in the cannabis space.
            </p>
          </div>
        </div>

        <div className="products-grid" data-aos="fade-up" data-aos-delay="100">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="product-overlay">
                  <Link href={product.link} className="btn btn-glass-sm">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <div className="product-icon">
                  <i className={product.icon}></i>
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <Link href={product.link} className="product-link" passHref>
                  Explore <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div
            className="col-12 text-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link href="/projects" className="btn btn-primary btn-lg cta-btn">
              View All Products
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-development-section {
          background-color: var(--dark-surface);
          position: relative;
          overflow: hidden;
        }

        .product-development-section:before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .section-subheading {
          max-width: 700px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 1.1rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 48px;
        }

        .product-card {
          background: var(--dark-surface-2);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--dark-border);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: rgba(16, 185, 129, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px var(--primary-glow);
        }

        .product-image {
          position: relative;
          overflow: hidden;
          height: 220px;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .product-image img {
          transform: scale(1.08);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .product-overlay :global(.btn-glass-sm) {
          padding: 10px 24px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          font-family: var(--font-body);
          text-decoration: none;
          transition: all 0.3s;
        }

        .product-overlay :global(.btn-glass-sm:hover) {
          background: var(--primary);
          border-color: var(--primary);
        }

        .product-info {
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--primary-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: var(--primary);
          font-size: 18px;
          transition: all 0.3s;
        }

        .product-card:hover .product-icon {
          background: var(--primary);
          color: #fff;
          transform: scale(1.05);
        }

        .product-info h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .product-info p {
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 1.7;
          flex: 1;
          font-family: var(--font-body);
        }

        .product-link {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s;
          font-family: var(--font-body);
          font-size: 14px;
        }

        .product-link i {
          margin-left: 6px;
          transition: transform 0.3s;
          font-size: 12px;
        }

        .product-link:hover {
          color: #34D399;
        }

        .product-link:hover i {
          transform: translateX(5px);
        }

        .cta-btn {
          padding: 14px 36px;
          font-weight: 600;
          border-radius: 10px;
          font-family: var(--font-body);
        }

        @media (max-width: 991px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductDevelopment;
