import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { notify } from "../../redux/reducers/notifyReducer"
import { login } from "../../redux/reducers/userReducer"

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    if (username && password) {
      dispatch(login({ username, password }))
        .catch((err) => {
          dispatch(notify(err.message, true, 5))
        })
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
  login: PropTypes.func.isRequired
}

export default LoginForm;