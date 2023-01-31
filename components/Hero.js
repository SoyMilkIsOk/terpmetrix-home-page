import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Hero = () => {
  return (
    <section className="section position-relative">
      <Container fluid="lg" className='grid'>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="pr-lg-5">
              {/* <p className="text-uppercase text-primary font-weight-medium f-14 mb-4"></p> */}
              <h1 className="text-light mb-4 font-weight-normal line-height-1_4">The future of cannabis is <span className="important-text font-weight-medium">coming soon...</span></h1>
              <p className="text-light mb-4 pb-1">Slowly but surely, the industry is coming to realize THC isn&apos;t the only thing that matters. <span className="important-text font-weight-medium">Terpenes</span> are quickly becoming the driving factor when it comes to purchasing cannabis.</p>
              <p className="text-light mb-2 pb-2">
              <b>Join us </b> in building a better future for cannabis everywhere. 
              </p>

              {/* button for whitepaper */}
              <button>
                <a className='text-light' href='/Terpmetrix-WhitePaper.pdf'>Read Whitepaper <span className="ml-2 right-icon">&#8594;</span></a>
              </button>
              <p className='pb-4'> </p>

              <form className="Form" name="beta-users" data-netlify="true">
              <input type="hidden" name="form-name" value="beta-users" />
              <p>
              <label><input name ="email" type="email" placeholder="Enter your email" /></label>
              </p>
              <p>
              <button type="submit" className='text-light'>
              Get Updates <span className="ml-2 right-icon">&#8594;</span>
              </button>
              </p>
              </form>

            </div>
          </Col>
        </Row>
      </Container>
      <div className="mt-5 mt-lg-0 ms-4 bgimage">
          <span className='emojis fire'>🔥</span>
          <span className='emojis gas'>⛽️</span>
          <span className='emojis leaf'>🌿</span>
          <span className='emojis lemon'>🍋</span>
          <span className='emojis orange'>🍊</span>
          <span className='emojis peach'>🍑</span>
          <span className='emojis grape'>🍇</span>
          <span className='emojis cherry'>🍒</span>
          <span className='emojis blueberry'>🫐</span>
      </div>
    </section>
  );
}

export default Hero;