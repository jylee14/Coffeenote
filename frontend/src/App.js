import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import CoffeeService from "./services/coffee"
import LoginService from "./services/login"
import UserService from "./services/user"

import LoginForm from "./components/forms/LoginForm"
import CreateUserForm from "./components/forms/CreateUserForm"
import CoffeeNoteForm from "./components/forms/CoffeeNoteForm"

import Togglable from "./components/Togglable"
import CoffeeList from "./components/coffee/CoffeeList"
import Notification from "./components/displays/Notification"
import GreetingBanner from "./components/displays/GreetingBanner"

function App() {
  const [user, setUser] = useState(null)
  const [coffeeNotes, setCoffeeNoes] = useState([])
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  // attempt to log in from previous session
  useEffect(() => {
    const savedUserString = window.localStorage.getItem("savedUser")
    if(savedUserString) {
      const savedUser = JSON.parse(savedUserString)
      setUser(savedUser)
    }
  }, [])  

  // attempt to grab user's coffeeNotes from DB if logged in
  useEffect(() => {
    // if the user token exists, make a GET /api/coffee with Auth header
    // to grab all the coffeeNotes assoc. w/ the current user
    if(user) {
      CoffeeService
        .getCoffeeNotes(user.token)
        .then(coffee => setCoffeeNoes(coffee))
    }
  }, [user])
  

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
    }, 3500)
  }

  const coffeeRef = useRef()
  const handleCoffeeCreate = async (coffee) => {
    coffeeRef.current.toggleVisibility()
    const userToken = user.token
    const res = await CoffeeService.create(userToken, coffee)
    setCoffeeNoes(coffeeNotes.concat(res))
    notify("Succesfully created a new coffee note")
  }

  return (
    <div className="App"> 
    <Notification message={message} isError={isError}></Notification>
    {
      user ? 
      <div>
        <GreetingBanner username={user.username} logout={logout}></GreetingBanner>
        <Togglable buttonLabel="New Coffee Note" className="secondaryTogglable" ref={coffeeRef}>
          <CoffeeNoteForm handleCreate={handleCoffeeCreate}/>
        </Togglable>
        <CoffeeList coffeeData={coffeeNotes}></CoffeeList>
      </div>
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
