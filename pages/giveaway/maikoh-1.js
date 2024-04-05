import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from '../../components/Footer';

const Maikoh1 = () => {
  return (
    <Layout pageTitle="Maikoh Boulder - Giveaway Entry">
      <Header />
      <div>
        <h1>Maikoh Boulder</h1>
        <p>Enter your Instagram handle below to get another entry into the giveaway!</p>
        <form className="Form" name="maikoh-1-entries" data-netlify="true">
          <input type="hidden" name="form-name" value="maikoh-1-entries" />
          <label>Instagram Handle</label>
          <input name="username" type="text" placeholder="Enter your Instagram handle" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </Layout>
  );
}

export default Maikoh1;