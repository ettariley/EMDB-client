import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Button, Card, Container } from 'react-bootstrap';

import './login-view.scss'

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    props.onLoggedIn(username);
  }

  return (
    <Container className='login-container'>
      <Card bg='dark' text='light' border='light' className='login-card'>
        <Form>
          <h3>User Login</h3>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username: </Form.Label>
            <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Label>Password: </Form.Label>
            <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant='custom-primary' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        <Button variant="outline-light" className='register-button'>New User? Register Here</Button>
      </Card>
    </Container>
  );
}

LoginView.propTypes = {
  Username: propTypes.string,
  Password: propTypes.string,
  setUsername: propTypes.func,
  setPassword: propTypes.func
};