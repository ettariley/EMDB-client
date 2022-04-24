import React, { useState } from 'react';
import propTypes from 'prop-types';

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
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <button onClick={() => {alert('Link to registration page coming soon.')}}>Register</button>
    </>
  );

}

LoginView.propTypes = {
  Username: propTypes.string,
  Password: propTypes.string,
  setUsername: propTypes.func,
  setPassword: propTypes.func
};