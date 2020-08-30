import React, { useState, useRef } from 'react'
import Modal from 'react-modal'
import CoffeeNoteForm from '../forms/CoffeeNoteForm'

import Filter from '../forms/Filter'
import CoffeeList from '../coffee/CoffeeList'
import GreetingBanner from '../displays/GreetingBanner'

const UserPage = ({ user }) => {
  Modal.setAppElement(".App")
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  return (
    <div>
      <GreetingBanner username={user.username}></GreetingBanner>
      <div className="userContent">
        <Filter></Filter>
        <CoffeeList />

        <button onClick={openModal}>New Coffee Note</button>

        <Modal id="newItemModal"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Create new coffee note">
          <CoffeeNoteForm userToken={user.token} closeModal={closeModal}/>
        </Modal>
      </div>
    </div>
  )
}

export default UserPage