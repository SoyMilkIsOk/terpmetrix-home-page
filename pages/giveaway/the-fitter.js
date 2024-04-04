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

const TheFitter = () => {
  return (
      <Layout pageTitle="The Fitter - Giveaway Entry">
        <Header />
        <Container maxW="container.md" my={4} py={4} bg="white" borderRadius="md" boxShadow="md">
          <h1>The Fitter</h1>
          <p>Enter your Instagram handle below to get another entry into the giveaway!</p>
          <FormControl>
            <FormLabel>Instagram Handle</FormLabel>
            <Input type="text" placeholder="Enter your Instagram handle" />
            <Button type="submit" colorScheme="blue" mt={4}>Submit</Button>
          </FormControl>
        </Container>
        <Footer />
      </Layout>
    );
}

export default TheFitter;