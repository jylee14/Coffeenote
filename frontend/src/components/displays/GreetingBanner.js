import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/reducers/userReducer'

const GreetingBanner = ({ username }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('savedUser')
    dispatch(logout())
  }

  const padding = {
    padding: '15px'
  }
  return (
    <header>
      <span>
        <div style={{ float: 'left' }}>Welcome {username}!</div>
        <span style={{ float: 'right' }}>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/coffee">Coffee</Link>
          <Link style={padding} to="/bean">Beans</Link>
          <button onClick={handleLogout}>Logout</button>
        </span>
      </span>
    </header>
  )
}

GreetingBanner.prototype = {
  username: PropTypes.string.isRequired
}

export default GreetingBanner