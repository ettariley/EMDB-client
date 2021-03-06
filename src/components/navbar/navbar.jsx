import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.scss';

export default function Navbar({user}) {

  const logOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isLoggedIn = () => {
    let accessToken = localStorage.getItem('token');
    if(typeof window == 'undefined') {
      return false;
    }
    if (accessToken) {
      return accessToken;
    } else {
      return false;
    }
  }

  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container>
        <Navbar.Brand href="/">Etta's Movie Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            {/* show username for profile link if logged in */}
            {isLoggedIn() && (
              <Link to={`/users/${user}`} className="nav-link nav-link-center">{user}</Link>
              )}
            {/* show sign out link if logged in */}
            {isLoggedIn() && (
              <Button variant='link' onClick={() => { logOut() }}>Logout</Button>
              )}
            {/* show sign up button if not logged in */}
            {!isLoggedIn() && (
              <Link to="/register" className="nav-link nav-link-center">Sign Up</Link>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}