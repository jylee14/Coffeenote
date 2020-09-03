import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal, ModalBody, Form, ModalTitle, FormControl, FormLabel, FormGroup, Row, Col, Button } from 'react-bootstrap'

import { createCoffeeNote } from '../../redux/reducers/coffeeReducer'
import { useInputField } from '../../hooks/inputField'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const CoffeeNoteForm = ({ style, userToken, show, closeModal }) => {
  const dispatch = useDispatch()

  const formatDate = date => {
    if ('object' === typeof date) {
      const isoDate = date.toISOString()
      return isoDate.split('T')[0]
    }
  }

  const { reset: resetOrigin, ...origin } = useInputField('')
  const { reset: resetDate, ...roastDate } = useInputField(formatDate(new Date()), 'date')
  const { reset: resetMethod, ...method } = useInputField('')
  const { reset: resetCoffeeWeight, ...coffeeWeight } = useInputField(0)
  const { reset: resetFinalWeight, ...finalWeight } = useInputField(0)
  const { reset: resetRating, ...rating } = useInputField(1)
  const { reset: resetBrewNotes, ...brewNotes } = useInputField('', 'text', false)
  const { reset: resetTasteNotes, ...tasteNotes } = useInputField('', 'text', false)

  const createNote = e => {
    e.preventDefault()

    const coffee = {
      origin: origin.value,
      roastDate: new Date(roastDate.value),
      coffeeWeight: coffeeWeight.value,
      finalWeight: finalWeight.value,
      brewMethod: method.value,
      tasteRating: rating.value,
      brewNotes: brewNotes.value,
      tasteNotes: tasteNotes.value
    }

    resetOrigin()
    resetDate()
    resetMethod()
    resetCoffeeWeight()
    resetFinalWeight()
    resetRating()
    resetBrewNotes()
    resetTasteNotes()

    dispatch(createCoffeeNote(userToken, coffee))
    closeModal()
  }

  const padding = { padding: '3px' }

  return (
    <Modal show={show} onHide={closeModal}>
      <ModalHeader closeButton>
        <ModalTitle>
          Create new coffee note
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={createNote}>
          <FormGroup>
            <Row style={padding}>
              <Col><FormLabel>Coffee Origin</FormLabel></Col>
              <Col><FormControl {...origin}></FormControl></Col>
            </Row>
            <Row style={padding}>
              <Col><FormLabel>Roast Date</FormLabel></Col>
              <Col><FormControl {...roastDate}></FormControl></Col>
            </Row>
            <Row style={padding}>
              <Col><FormLabel>Brew Method</FormLabel></Col>
              <Col><FormControl {...method}></FormControl></Col>
            </Row>
            <Row style={padding}>
              <Col><FormLabel>Coffee Weight (g)</FormLabel></Col>
              <Col><FormControl {...coffeeWeight} min="1" step="0.1"></FormControl></Col>
            </Row>
            <Row style={padding}>
              <Col><FormLabel>Final Weight</FormLabel></Col>
              <Col><FormControl {...finalWeight} min={Number(coffeeWeight.value) + 1} step="0.1"></FormControl></Col>
            </Row>
            <Row style={padding}>
              <Col><FormLabel>Taste Rating</FormLabel></Col>
              <Col><FormControl {...rating} min="1" max="5"></FormControl></Col>
            </Row>
            <Row style={padding}>
              <Col><FormLabel>Brew Notes</FormLabel></Col>
              <Col><FormControl as="textarea" {...brewNotes}></FormControl></Col>
            </Row>
            <Row style={padding}>
              <Col><FormLabel>Taste Notes</FormLabel></Col>
              <Col><FormControl as="textarea" {...tasteNotes}></FormControl></Col>
            </Row>
          </FormGroup>
          <Button variant="primary" block type="submit">Create</Button>
          <Button variant="danger" block onClick={closeModal}>Cancel</Button>
        </Form>
      </ModalBody >
    </Modal >
  )
}

export default CoffeeNoteForm