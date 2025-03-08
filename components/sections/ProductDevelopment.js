import Link from "next/link";
import Image from "next/image";

const ProductDevelopment = () => {
  const products = [
    {
      id: 1,
      title: "TerpFocus",
      description:
        "TerpFocus is a premier cannabis photography service dedicated to capturing the essence of high-quality flower, concentrates, and cannabis culture through stunning macro and lifestyle photography.",
      image: "/images/terpfocus.jpg",
      link: "/projects#terpfocus",
    },
    {
      id: 2,
      title: "TerpScoops",
      description:
        "TerpScoops are the ultimate precision tool for dosing and packing cannabis. Designed for connoisseurs and detail-oriented consumers, it ensures a clean, consistent experience every time.",
      image: "/images/terpscoops.jpg",
      link: "/projects#terpscoops",
    },
    {
      id: 3,
      title: "TerpForge",
      description:
        "TerpForge is a cannabis-focused web development and digital branding agency, helping dispensaries, brands, and tech startups build high-performance websites optimized for growth.",
      image: "/images/terpforge.jpg",
      link: "/projects#terpforge",
    },
  ];

  return (
    <section className="product-development-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center" data-aos="fade-up">
            <h2 className="section-heading">Product Development</h2>
            <p className="section-subheading">
              We&apos;re developing innovative solutions to revolutionize how
              cannabis compounds are analyzed, tracked, and utilized.
            </p>
          </div>
        </div>

        <div className="row mt-5">
          {products.map((product) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={product.id * 100}
            >
              <div className="product-card">
                <div className="product-image">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }} // optional
                  />
                  <div className="product-overlay">
                    <Link href={product.link} className="btn btn-light">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <Link href={product.link} className="product-link" passHref>
                    Explore <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
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
            <Link href="/projects" className="btn btn-primary btn-lg">
              View All Products
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-development-section {
          background-color: #f9f9f9;
          position: relative;
        }

        .section-subheading {
          max-width: 700px;
          margin: 0 auto;
          color: #666;
        }

        .product-card {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
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
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.1);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(36, 88, 40, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .product-info {
          padding: 25px;
        }

        .product-info h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: var(--dark-color);
        }

        .product-info p {
          color: #666;
          margin-bottom: 20px;
        }

        .product-link {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s;
        }

        .product-link i {
          margin-left: 5px;
          transition: transform 0.3s;
        }

        .product-link:hover {
          color: var(--secondary-color);
        }

        .product-link:hover i {
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .product-card {
            margin-bottom: 30px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductDevelopment;
