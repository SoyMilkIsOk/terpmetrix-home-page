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
          <NavbarBrand href="/"><object type="image/png" className='logo' data="/images/logo-circle-text-rect.png">Your browser does not support PNGs</object></NavbarBrand>
        </Navbar>
      </Container>
  );
}

export default Header;