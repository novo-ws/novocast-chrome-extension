import React from 'react';
import { SettingsCog } from './settings';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

const Header = ({ show }) => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="#">NovoCast</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <SettingsCog show={show} />
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
