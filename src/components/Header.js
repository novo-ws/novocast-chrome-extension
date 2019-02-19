import React from 'react';
import { SettingsCog } from './settings';
import { Navbar, NavbarBrand, Nav, NavItem, Spinner } from 'reactstrap';
const Header = ({ show, casting, add }) => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="#"> NovoCast</NavbarBrand>
        {casting && (
          <Spinner
            style={{ width: '3rem', height: '3rem', color: '#fff' }}
            type="grow"
          />
        )}
        <Nav className="ml-auto" navbar>
          <NavItem>
            <i className="fa fa-plus" onClick={add} />{' '}
            <SettingsCog show={show} />
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
