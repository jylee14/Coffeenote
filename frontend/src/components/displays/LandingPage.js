import React from 'react'
import Togglable from './Togglable'

import LoginService from '../../services/login'
import UserService from '../../services/user'

import LoginForm from '../forms/LoginForm'
import CreateUserForm from '../forms/CreateUserForm'
import { Link, Switch, Route } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to CoffeeNote!</h1>
      <div className="landingForms">
        <Link to="/login"><button>Log in</button></Link>
        <Link to="/create"><button>Create a new profile</button></Link>
      </div>
    </div>
  )
}

export default LandingPage