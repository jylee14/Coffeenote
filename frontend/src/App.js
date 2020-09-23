import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import './misc/math'
import './misc/string'

import { initialLoad } from './redux/reducers/userReducer'
import { initializeCoffee } from './redux/reducers/coffeeReducer'

import GreetingBanner from './components/displays/GreetingBanner'
import UserPage from './components/displays/user/UserPage'
import LandingPage from './components/displays/LandingPage'
import Notification from './components/displays/Notification'

import { login } from './redux/reducers/userReducer'
import { createUser } from './redux/reducers/userReducer'
import { notify } from './redux/reducers/notifyReducer'

import { initializeBeans } from './redux/reducers/beanReducer'
import UserForm from './components/forms/UserForm'

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
    <div>
      <GreetingBanner username={(user || {}).username} />
      <div className="container">
        <Notification />
        <Switch>
          <Route path="/create">
            <UserForm
              action={createUser}
              buttonLabel="Create"
              onSuccess={() => {
                dispatch(notify('New profile created successfully! Logging in...'))
              }}
              onFail={(err) => { dispatch(notify(err.message, true)) }}
            />
          </Route>
          <Route path="/login">
            <UserForm
              action={login}
              buttonLabel="Login"
              onFail={(err) => { dispatch(notify(err.message, true)) }}
            />
          </Route>
          <Route path="/">
            {user ? <UserPage user={user}></UserPage> : <LandingPage></LandingPage>}
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
