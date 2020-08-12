import React, { useState, useEffect } from 'react';
import './App.css';

import Notification from "./components/Notification"
import LoginService from "./services/login"
import LoginForm from "./components/LoginForm"
import CreateUserForm from "./components/CreateUserForm"
import UserService from "./services/user"

import GreetingBanner from "./components/GreetingBanner"
import Togglable from "./components/Togglable"

function App() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const savedUserString = window.localStorage.getItem("savedUser")
    const savedUser = JSON.parse(savedUserString)
    setUser(savedUser)
  }, [])

  const saveUser = user => {
    window.localStorage.setItem("savedUser", JSON.stringify(user))

    setUser(user)
  }

  const logout = () => {
    window.localStorage.removeItem("savedUser")
    setUser(null)
  }

  const notify = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setMessage(null)
      setIsError(false)
    }, 2500)
  }

  return (
    <div className="App"> 
    <Notification message={message} isError={isError}></Notification>
    {
      user ? 
      <GreetingBanner username={user.username} logout={logout}></GreetingBanner>
      :
      <div>
        <h1>Welcome to CoffeeNote!</h1>
        <div className="landingForms">
          <LoginForm login={LoginService.login} saveUser={saveUser} notify={notify}/>
          <Togglable buttonLabel="Create a profile">
            <CreateUserForm create={UserService.create} notify={notify}></CreateUserForm>
          </Togglable>
        </div>
      </div>
    }
    </div>
  );
}

export default App;
