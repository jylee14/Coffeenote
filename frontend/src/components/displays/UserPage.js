import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import CoffeeNoteForm from '../forms/CoffeeNoteForm'

import Filter from '../forms/Filter'
import BeanList from './bean/BeanList'
import CoffeeList from './coffee/CoffeeList'
import GreetingBanner from '../displays/GreetingBanner'

const UserPage = ({ user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const style = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <div>
      <GreetingBanner username={user.username}></GreetingBanner>

      <Route path="/bean">
        <BeanList style={style} userToken={user.token} isOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
      </Route>

      <Route path="/coffee">
        <div className="userContent">
          <Filter></Filter>

          <button onClick={openModal}>New Coffee Note</button>
          <CoffeeList />
          <CoffeeNoteForm style={style} userToken={user.token} isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </Route>
    </div>
  )
}

export default UserPage