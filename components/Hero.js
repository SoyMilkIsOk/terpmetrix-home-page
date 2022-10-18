import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Hero = () => {
  return (
    <section className="section position-relative">
      <Container className='xl'>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="pr-lg-5">
              {/* <p className="text-uppercase text-primary font-weight-medium f-14 mb-4"></p> */}
              <h1 className="mb-4 font-weight-normal line-height-1_4">The future of social cannabis consumption is <span className="important-text font-weight-medium">coming soon...</span></h1>
              <p className="text-muted mb-4 pb-2">For too long, cannabis consumers have been fed marketing fluff and false flags about what&apos;s <b>really good</b> with the industry </p> 
              <p className="text-muted mb-4">We&apos;re here to change that. </p>
              <p className="text-muted mb-4 pb-2">
              As the rest of the country prepares for legalization, these culture vultures will only inrease their grip upon the industry - fight back! <b>Join the revolution</b> and help us build a better future for cannabis consumers everywhere.
              </p>

              <form className="Form" name="beta-users" data-netlify="true">
              <input type="hidden" name="form-name" value="beta-users" />
              <p>
              <label><input name ="email" type="email" placeholder="Enter your email" /></label>
              </p>
              <p>
              <button type="submit" className='text-light'>
              Join the Beta <span className="ml-2 right-icon">&#8594;</span>
              </button>
              </p>
              </form>

            </div>
          </Col>
          <Col lg={6}>
            <div className="mt-5 mt-lg-0">
              <img src="/images/Group Members.png" alt="" className="img-fluid mx-auto d-block"/>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;