import React from 'react';
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  
  return (
    <><section className="footer section">
      <Container>
        {/* <Row>
            <Col md={4}>
              <h6 className="text-dark mb-3">Our Address</h6>
              <p className="text-muted f-14">1234 Lorem Ipsum dummy text, 12345</p>
              <h6 className="text-muted pb-2">Email: email@email.com</h6>
              <ul className="list-unstyled footer-social-list mt-4">
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-facebook"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-instagram"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="mdi mdi-linkedin"></i></a></li>
              </ul>
            </Col>
        </Row> */}
    <Row>
        <Col md={12}>
          <div className="text-center text-muted">
            <p className="mb-0 f-15">2022 © Cascade Street Coders LLC.</p>
          </div>
        </Col>
      </Row>
      </Container>
    </section></>
  );
}

export default Footer;