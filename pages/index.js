import Layout from "../components/Layout";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from '../components/Footer';

const Index = () => {
  return (
    <Layout pageTitle="The Future of Cannatech - Terpmetrix">
      <form name="beta-users" netlify netlify-honeypot="bot-field" action='/' hidden>
  <input type="email" name="email" />
</form>
<form name="maikoh-entries-1" netlify netlify-honeypot="bot-field" action='/' hidden>
  <input type="text" name="username" />
</form>
      <Header />
      <Hero />
      <Footer />
    </Layout>
  )
}

export default Index;
