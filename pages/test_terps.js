import Layout from "../components/Layout";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Feature from '../components/Feature';
import Service from '../components/Service';
import About from '../components/About';
import Footer from '../components/Footer';
import AccordianDropdown from "../components/AccordianDropdown";

const TestTerps = () => {
  return (
    <Layout pageTitle="Test Results - Double Lemon Gucci">
      <Header />
      <Service />
      <AccordianDropdown />
      <Footer />
    </Layout>
  )
}

export default TestTerps;
