import React from 'react'
import Togglable from './Togglable'

import LoginService from '../../services/login'
import UserService from '../../services/user'

import LoginForm from '../forms/LoginForm'
import CreateUserForm from '../forms/CreateUserForm'

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to CoffeeNote!</h1>
      <div className="landingForms">
        <LoginForm login={LoginService.login} />
        <Togglable buttonLabel="Create a profile">
          <CreateUserForm create={UserService.create} />
        </Togglable>
      </div>
    </div>
  )
}

export default LandingPage