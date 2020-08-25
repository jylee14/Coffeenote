import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import LoginService from "./services/login"
import UserService from "./services/user"

import LoginForm from "./components/forms/LoginForm"
import CreateUserForm from "./components/forms/CreateUserForm"
import CoffeeNoteForm from "./components/forms/CoffeeNoteForm"

import Togglable from "./components/displays/Togglable"
import CoffeeList from "./components/coffee/CoffeeList"
import Notification from "./components/displays/Notification"
import GreetingBanner from "./components/displays/GreetingBanner"
import { initializeCoffee, createCoffeeNote } from './redux/reducers/coffeeReducer';
import { notify } from "./redux/reducers/notifyReducer"

function App() {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  // attempt to log in from previous session
  useEffect(() => {
    const savedUserString = window.localStorage.getItem("savedUser")
    if (savedUserString) {
      const savedUser = JSON.parse(savedUserString)
      setUser(savedUser)
    }
  }, [])

  // attempt to grab user's coffeeNotes from DB if logged in
  // if the user token exists, make a GET /api/coffee with Auth header
  // to grab all the coffeeNotes assoc. w/ the current user
  useEffect(() => {
    if (user) {
      dispatch(initializeCoffee(user.token))
    }
  }, [user, dispatch])


  const saveUser = user => {
    window.localStorage.setItem("savedUser", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    window.localStorage.removeItem("savedUser")
    setUser(null)
  }

  const coffeeRef = useRef()
  const handleCoffeeCreate = async (coffee) => {
    coffeeRef.current.toggleVisibility()
    const userToken = user.token
    dispatch(createCoffeeNote(userToken, coffee))
    dispatch(notify("New note created!", false, 5))
  }

  return (
    <div className="App">
      <Notification />
      {
        user ?
          <div>
            <GreetingBanner username={user.username} logout={logout}></GreetingBanner>
            <Togglable buttonLabel="New Coffee Note" className="secondaryTogglable" ref={coffeeRef}>
              <CoffeeNoteForm handleCreate={handleCoffeeCreate} />
            </Togglable>
            <CoffeeList />
          </div>
          :
          <div>
            <h1>Welcome to CoffeeNote!</h1>
            <div className="landingForms">
              <LoginForm login={LoginService.login} saveUser={saveUser} />
              <Togglable buttonLabel="Create a profile">
                <CreateUserForm create={UserService.create} />
              </Togglable>
            </div>
          </div>
      }
    </div>
  );
}

export default App;
