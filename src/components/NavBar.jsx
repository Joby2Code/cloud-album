import React from 'react';
import { Button, Navbar, NavbarBrand } from 'reactstrap';

const NavBar = ({ children, toggleLogin }) => {
  return (
    <React.Fragment>
      <Navbar>
        <NavbarBrand>Album</NavbarBrand>
        {children}
        <Button onClick={toggleLogin}>API Key</Button>
      </Navbar>
    </React.Fragment>
  )
}

export default NavBar