import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

import Notification from './components/displays/Notification'
import { initializeCoffee } from './redux/reducers/coffeeReducer'
import { initialLoad } from './redux/reducers/userReducer'

import UserPage from './components/displays/UserPage'
import LandingPage from './components/displays/LandingPage'

import LoginService from './services/login'
import UserService from './services/user'

import LoginForm from './components/forms/LoginForm'
import CreateUserForm from './components/forms/CreateUserForm'
import { Switch, Route } from 'react-router-dom'


import './misc/string'

function App() {
  const dispatch = useDispatch()

  // attempt to log in from previous session
  useEffect(() => {
    dispatch(initialLoad())
  }, [dispatch])

  // attempt to grab user's coffeeNotes from DB if logged in
  // if the user token exists, make a GET /api/coffee with Auth header
  // to grab all the coffeeNotes assoc. w/ the current user
  const user = useSelector(state => state.user)
  useEffect(() => {
    if (user) {
      dispatch(initializeCoffee(user.token))
    }
  }, [user, dispatch])

  return (
    <div className="App">
      <Notification />
      <Switch>
        <Route path="/create">
          <CreateUserForm create={UserService.create} />
        </Route>
        <Route path="/login">
          <LoginForm login={LoginService.login} />
        </Route>
        <Route path="/">
          {user ? <UserPage user={user}></UserPage> : <LandingPage></LandingPage>}
        </Route>
      </Switch>
    </div>
  )
}

export default App
