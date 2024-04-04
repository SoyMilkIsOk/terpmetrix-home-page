import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { 
  Container,
  FormControl,
  FormLabel,
  Input,
  Button
 } from '@chakra-ui/react'

const Maikoh1 = () => {
  return (
    <Layout pageTitle="Maikoh Boulder - Giveaway Entry">
      <Header />
      <Container maxW="container.md" my={4} py={4} bg="white" borderRadius="md" boxShadow="md">
        <h1>Maikoh Boulder</h1>
        <p>Enter your Instagram handle below to get another entry into the giveaway!</p>
        <FormControl className="Form" name="maikoh-1-entries" data-netlify="true">
          <Input type="hidden" name="form-name" value="beta-users" />
          <FormLabel>Instagram Handle</FormLabel>
          <Input name="username" type="text" placeholder="Enter your Instagram handle" />
          <Button type="submit" colorScheme="blue" mt={4}>Submit</Button>
        </FormControl>
      </Container>
      <Footer />
    </Layout>
  );
}

export default Maikoh1;