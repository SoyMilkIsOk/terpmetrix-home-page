import Layout from "../components/Layout";
import Header from "../components/Header";
import SurveyForm from "../components/SurveyForm";
import Hero from "../components/Hero";
import Feature from '../components/Feature';
import Service from '../components/Service';
import About from '../components/About';
import Footer from '../components/Footer';
import AccordianDropdown from "../components/AccordianDropdown";

const Survey = () => {
  return (
    <Layout pageTitle="Survey Page - Double Lemon Gucci">
      <Header />
      <SurveyForm />
      <Footer />
    </Layout>
  )
}

export default Survey;
