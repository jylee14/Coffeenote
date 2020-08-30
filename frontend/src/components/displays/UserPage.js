import React, { useState } from 'react'
import Modal from 'react-modal'
import CoffeeNoteForm from '../forms/CoffeeNoteForm'

import Filter from '../forms/Filter'
import CoffeeList from '../coffee/CoffeeList'
import GreetingBanner from '../displays/GreetingBanner'

const UserPage = ({ user }) => {
  Modal.setAppElement('.App')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const customStyles = {
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
      <div className="userContent">
        <Filter></Filter>

        <button onClick={openModal}>New Coffee Note</button>
        <CoffeeList />

        <Modal id="newItemModal"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Create new coffee note"
          style={customStyles}>
          <CoffeeNoteForm userToken={user.token} closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  )
}

export default UserPage