import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Form, Button, Card, Container, Row } from 'react-bootstrap';

import './login-view.scss'
import axios from 'axios';

export function LoginView(props) {
  // Username and password hooks
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // Error hooks for validation
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if(username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if(password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // Send request to server for authentication
      axios.post('https://ettasmoviedb.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user');
    });    
    }
  };

  return (
    <Container className='login-container'>
      <Card bg='dark' text='light' border='light' className='login-card'>
        <Form>
          <h4>Login</h4>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username: </Form.Label>
            <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
            {/* code added here to display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Label>Password: </Form.Label>
            <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
            {/* code added here to display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>
          <Button variant='custom-primary' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        <Link to="/register">
          <Button variant="outline-light" className='register-button'>New User? Register Here</Button>
        </Link>
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