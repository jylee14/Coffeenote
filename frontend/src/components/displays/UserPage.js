import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import CoffeeNoteForm from '../forms/CoffeeNoteForm'

import Filter from '../forms/Filter'
import BeanList from './bean/BeanList'
import CoffeeList from './coffee/CoffeeList'
import { Button } from 'react-bootstrap'
import UserStats from './UserStats'

const UserPage = ({ user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [beans, setBeans] = useState([])

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  return (
    <div>
      <Switch>
        <Route path="/bean">
          <BeanList beans={beans} setBeans={setBeans} userToken={user.token} />
        </Route>
        <Route path="/coffee">
          <div className="userContent">
            <Filter></Filter>
            <Button block onClick={openModal}>New Coffee Note</Button>
            <CoffeeList />
            <CoffeeNoteForm userToken={user.token} show={modalIsOpen} closeModal={closeModal} />
          </div>
        </Route>
        <Route path="/">
          <UserStats />
        </Route>
      </Switch>
    </div>
  )
}

export default UserPage