import React from "react";
import { Container, Row, Col } from "reactstrap";

const Hero = () => {
  return (
    <section className="section position-relative">
      <Container fluid="lg" className="grid">
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="pr-lg-5">
              {/* <p className="text-uppercase text-primary font-weight-medium f-14 mb-4"></p> */}
              <h1 className="text-light mb-4 font-weight-normal line-height-1_4">
                The future of cannatech is{" "}
                <span className="important-text font-weight-medium">
                  coming soon...
                </span>
              </h1>

              <p className="text-light mb-4 pb-1">
                Welcome to{" "}
                <span className="important-text font-weight-medium">
                  Terpmetrix
                </span>
                , the pioneering force in the cannabis industry dedicated to
                unlocking the full potential of terpenes. Our innovative
                technology is revolutionizing the way consumers explore,
                understand, and experience cannabis.
              </p>

              {/* button for whitepaper */}
              {/* <button>
                <a className='text-light' href='/Terpmetrix-WhitePaper.pdf'>Read Whitepaper <span className="ml-2 right-icon">&#8594;</span></a>
              </button> */}

              <p className="text-light mb-4 pb-1">
                Sign up to learn more about our groundbreaking solutions,
                receive updates on our latest advancements, and be part of the
                future of cannabis.
              </p>

              <form
                className="Form"
                name="beta-users"
                method="POST"
                data-netlify="true"
                data-netlify-recaptcha="true"
              >
                <input type="hidden" name="form-name" value="beta-users" />
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  <button type="submit" className="text-light">
                    Get Updates <span className="ml-2 right-icon">&#8594;</span>
                  </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="mt-5 mt-lg-0 ms-4 bgimage">
        <span className="emojis fire">🔥</span>
        <span className="emojis gas">⛽️</span>
        <span className="emojis leaf">🌿</span>
        <span className="emojis lemon">🍋</span>
        <span className="emojis orange">🍊</span>
        <span className="emojis peach">🍑</span>
        <span className="emojis grape">🍇</span>
        <span className="emojis cherry">🍒</span>
        <span className="emojis wood">🪵</span>
      </div>
    </section>
  );
};

export default Hero;
