import React, { useState } from 'react'
import CoffeeNoteForm from '../../forms/CoffeeNoteForm'

import Filter from '../../forms/Filter'
import CoffeeList from './CoffeeList'
import { Button } from 'react-bootstrap'

const CoffeePage = ({ user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  return (
    <div className="userContent">
      <Filter></Filter>
      <Button block onClick={openModal}>New Coffee Note</Button>
      <CoffeeList  />
      <CoffeeNoteForm userToken={user.token} show={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default CoffeePage;