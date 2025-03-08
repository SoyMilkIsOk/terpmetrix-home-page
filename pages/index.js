import { useEffect } from 'react';
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from '../components/Footer';
import Intro from '../components/sections/Intro';
import ProductDevelopment from '../components/sections/ProductDevelopment';
import ProjectsTimeline from '../components/sections/ProjectsTimeline';
import StayInformed from '../components/sections/StayInformed';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <Layout pageTitle="The Future of Cannatech - Terpmetrix">
      <Header />
      <main>
        <Intro />
        <ProductDevelopment />
        <ProjectsTimeline />
        <StayInformed />
      </main>
      <Footer />
    </Layout>
  )
}

export default Index;