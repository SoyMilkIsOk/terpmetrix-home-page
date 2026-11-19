import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

const JarSale = () => {
  return (
    <Layout
      pageTitle="TerpScoops Jar Sale | Terpmetrix"
      ogTitle="TerpScoops Jar Sale — Terpmetrix"
      description="TerpScoops Jar Sale order form — Terpmetrix."
      canonicalPath="/sale"
    >
      <Header />
      <div className="container">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdatgGtDFDtchHdryNZuETIP6mLa3cjQy6XCSyAkUKWI_-fLQ/viewform?embedded=true"
          width="100%"
          height="1100"
          className="border-none"
          style={{ border: "none" }}
        >
          Loading…
        </iframe>
        </div>
        <style jsx>{`
          .container {
            padding: 100px 0;
          }
        `}</style>
      <Footer />
    </Layout>
  );
};

export default JarSale;
