import React, { useRef } from 'react'
import CoffeeNoteForm from '../forms/CoffeeNoteForm'

import Filter from '../forms/Filter'
import Togglable from '../displays/Togglable'
import CoffeeList from '../coffee/CoffeeList'
import GreetingBanner from '../displays/GreetingBanner'

const UserPage = ({ user }) => {
  const coffeeRef = useRef()
  return (
    <div>
      <GreetingBanner username={user.username}></GreetingBanner>
      <Filter></Filter>
      <CoffeeList />
      <Togglable buttonLabel="New Coffee Note" className="secondaryTogglable" ref={coffeeRef}>
        <CoffeeNoteForm toggleVisibility={() => coffeeRef.current.toggleVisibility()} userToken={user.token} />
      </Togglable>
    </div>
  )
}

export default UserPage