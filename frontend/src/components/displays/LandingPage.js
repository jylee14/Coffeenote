import React from 'react'
import { Link } from 'react-router-dom'

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