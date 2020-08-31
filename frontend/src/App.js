import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import './misc/math'
import './misc/string'

import { initialLoad } from './redux/reducers/userReducer'
import { initializeCoffee } from './redux/reducers/coffeeReducer'

import UserPage from './components/displays/UserPage'
import LandingPage from './components/displays/LandingPage'
import Notification from './components/displays/Notification'

import LoginForm from './components/forms/LoginForm'
import CreateUserForm from './components/forms/CreateUserForm'

import { initializeBeans } from './redux/reducers/beanReducer'

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
      dispatch(initializeBeans(user.token))
      dispatch(initializeCoffee(user.token))
    }
  }, [user, dispatch])

  return (
    <div className="App">
      <Notification />
      <Switch>
        <Route path="/create">
          <CreateUserForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          {user ? <UserPage user={user}></UserPage> : <LandingPage></LandingPage>}
        </Route>
      </Switch>
    </div>
  )
}

export default App
