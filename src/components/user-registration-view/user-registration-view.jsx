import axios from 'axios';
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Button, Container, Row, CardGroup, Card } from 'react-bootstrap';
import './user-registration-view.scss';

export function UserRegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  createNewUser = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  }

  return (
    <Container className='registration-container'>
      <Row className='user-registration'>
        <CardGroup>
          <Card bg='dark' text='light' border='light'>
            <Card.Body>
              <Card.Title>New User Registration</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)} 
                    required
                    placeholder='Username'
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required
                    minLength={8}
                    placeholder='Password must be at least 8 characters.'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required
                    placeholder='We will never share your email with anyone.'
                  />
                </Form.Group>
                <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                  <Form.Control 
                    type="text" 
                    value={birthday} 
                    onChange={e => setBirthday(e.target.value)} 
                    placeholder='Birthday'
                  />
                </Form.Group>
                <Button variant='custom-primary' type='submit' onClick={createNewUser}>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
    </Container>
  )
}

UserRegistrationView.propTypes = {
  user: propTypes.shape({
    Username: propTypes.string,
    Password: propTypes.string,
    Email: propTypes.string,
    Birthday: propTypes.string
  }),
  setUsername: propTypes.func,
  setPassword: propTypes.func,
  setEmail: propTypes.func,
  setBirthday: propTypes.func
};