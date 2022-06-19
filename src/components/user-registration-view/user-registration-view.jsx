import axios from 'axios';
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Button, Container, Row, CardGroup, Card } from 'react-bootstrap';
import './user-registration-view.scss';

export function UserRegistrationView(props) {
  // Username, passowrd, email, birthday hooks
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  // Error hooks for validation
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const [ birthdayErr, setBirthdayErr ] = useState('');

  const validate = () => {
    let isReq = true;
    // RegEx for validation
    const usernameValid = /^[a-z0-9]+$/i;
    const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const birthdayValid = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // Validate username
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if(username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    } else if(!usernameValid.test(username)) {
      setUsernameErr('Username must only use alphanumeric characters');
    }
    // Validate password
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if(password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    // Validate email
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if(!emailValid.test(email)) {
      setEmailErr('Please enter a valid email address');
      isReq = false;
    }
    //Validate birthday
    if (!birthday) {
      setBirthdayErr('Birthday required');
      isReq = false;
    } else if(!birthdayValid.test(birthday)) {
      setBirthdayErr('Please enter a valid date');
      isReq = false;
    }

    return isReq;
  }

  const createNewUser = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // Send request to server for authentication
      axios.post('https://ettasmoviedb.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      alert('User created! You will be redirected to the login screen.')
      window.open('/', '_self');
    })
    .catch(e => {
      console.error(e);
      alert('Unable to register');
    });    
    }
  }

  return (
    <Container className='registration-container'>
      <Row className='user-registration'>
        <h3>Etta's Movie Database</h3>
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
                  {/* code added here to display validation error */}
                  {usernameErr && <p>{usernameErr}</p>}
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
                  {/* code added here to display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}
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
                  {/* code added here to display validation error */}
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>
                <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                  <Form.Control 
                    type="text" 
                    value={birthday} 
                    onChange={e => setBirthday(e.target.value)} 
                    placeholder='MM-DD-YYYY'
                  />
                  {/* code added here to display validation error */}
                  {birthdayErr && <p>{birthdayErr}</p>}
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