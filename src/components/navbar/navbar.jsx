import React, { useState } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import './navbar.scss';

export function Navbar({user}) {

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  isLoggedIn = () => {
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
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
              )}
            {/* show sign out link if logged in */}
            {isLoggedIn() && (
              <Button variant='link' onClick={() => { this.onLoggedOut() }}>Logout</Button>
              )}
            {/* show sign up button if not logged in */}
            {!isLoggedIn() && (
              <Nav.Link href="/register">Sign Up</Nav.Link>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}