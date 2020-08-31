import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { notify } from '../../redux/reducers/notifyReducer'
import { login } from '../../redux/reducers/userReducer'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value
    if (username && password) {
      dispatch(login({ username, password }))
        .then(() => { history.push('/') })
        .catch((err) => { dispatch(notify(err.message, true)) })
    }
  }

  return (
    <div>
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
        <button id="login-button" type="submit">Login</button>
      </form>
      <button onClick={() => history.push('/')}>Cancel</button>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm