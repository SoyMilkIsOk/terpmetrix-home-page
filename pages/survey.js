import Layout from "../components/Layout";
import Header from "../components/Header";
import SurveyForm from "../components/SurveyForm";
import Footer from '../components/Footer';

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
