import axios from 'axios';
import React, { useState } from 'react';
import propTypes from 'prop-types';

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
    <>
      <form>
        <label>
          Username: 
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password: 
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Email: 
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Birthday: 
          <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </label>
        <button type='submit' onClick={createNewUser}>Submit</button>
      </form>
    </>
  )
}

UserRegistrationView.propTypes = {
  user: propTypes.shape({
    Username: propTypes.string,
    Password: propTypes.string,
    Email: propTypes.string,
    Birthday: propTypes.string
  }).isRequired,
  setUsername: propTypes.func,
  setPassword: propTypes.func,
  setEmail: propTypes.func,
  setBirthday: propTypes.func
};