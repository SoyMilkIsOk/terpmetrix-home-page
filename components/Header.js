import React, { useState, useEffect } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = () => {

  return (
      <Container>
        <Navbar light expand="md">
          <NavbarBrand href="/"><object type="image/png" width="400" data="images/terpmetrix-color.png">Your browser does not support PNGs</object></NavbarBrand>
        </Navbar>
      </Container>
  );
}

export default Header;