import React from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { notify } from "../../redux/reducers/notifyReducer"
import { login } from "../../redux/reducers/userReducer"

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value
    if (username && password) {
      dispatch(login({ username, password }))
        .catch((err) => {
          dispatch(notify(err.message, true))
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
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
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