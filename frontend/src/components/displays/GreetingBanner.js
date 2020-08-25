import React from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/reducers/userReducer"

const GreetingBanner = ({ username }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem("savedUser")
    dispatch(logout())
  }

  return (
    <header>
      <div>
        Welcome {username}! 
        <button onClick={handleLogout}>logout</button>
      </div>
    </header>
  );
};

GreetingBanner.prototype = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default GreetingBanner;