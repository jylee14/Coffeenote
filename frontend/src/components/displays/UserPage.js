import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import CoffeeNoteForm from '../forms/CoffeeNoteForm'

import Filter from '../forms/Filter'
import BeanList from './bean/BeanList'
import BeanInfo from './bean/BeanInfo'
import CoffeeList from './coffee/CoffeeList'
import GreetingBanner from '../displays/GreetingBanner'

const UserPage = ({ user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [beans, setBeans] = useState([])

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

  const beanById = id => beans.find(bean => bean.id === id)
  const match = useRouteMatch('/beanDetail/:id')
  const selectedBean = match ? beanById(match.params.id) : null

  return (
    <div>
      <GreetingBanner username={user.username}></GreetingBanner>

      <Route path="/beanDetail/:id">
        <BeanInfo bean={selectedBean} userToken={user.token}></BeanInfo>
      </Route>
      <Route path="/bean">
        <BeanList beans={beans} setBeans={setBeans} />
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