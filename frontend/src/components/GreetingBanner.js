import React from 'react';
import PropTypes from 'prop-types'

const GreetingBanner = ({ username, logout}) => {
  return (
    <header>
      <div>
        Welcome {username}! 
        <button onClick={logout}>logout</button>
      </div>
    </header>
  );
};

GreetingBanner.prototype = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default GreetingBanner;