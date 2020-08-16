import React, { useState } from 'react';
import PropTypes from 'prop-types'

const LoginForm = ({ login, saveUser, notify }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    if(username && password) {
      try {
        const user = await login({
          username, 
          password
        })

        setUsername("")
        setPassword("")
        saveUser(user)
      } catch(err) {
        const message = err.response.data.error
        notify(`failed to log in: ${message}`, true)
      }
    }
  }

  const loginStyle = {
    border: "solid",
    borderWidth: "2px",
    maxWidth: "300px",
    margin: "15px"
  }

  return (
    <div style={loginStyle}>
      <h3>Already have a profile? Log In!</h3>
      <form onSubmit={handleLogin}>
        <div> 
          username
          <input
            type="text"
            id="username"
            onChange={({ target }) => { setUsername(target.value) }}
            value={username}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            onChange={({ target }) => { setPassword(target.value) }}
            value={password}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default LoginForm;