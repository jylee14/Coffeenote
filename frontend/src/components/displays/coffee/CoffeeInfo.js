import React from 'react'
import { Card, ListGroup, ListGroupItem, Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { deleteCoffeeNote } from '../../../redux/reducers/coffeeReducer'

const CoffeeInfo = ({ coffee }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const cardStyle = {
    border: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    maxWidth: '20em',
    minWidth: '18em',
    position: 'relative',
    margin: '5px'
  }

  const deleteNote = () => {
    if (window.confirm('delete this note?')) {
      dispatch(deleteCoffeeNote(user.token, coffee.id))
    }
  }

  const formatDate = (dateString) => {
    const asDate = new Date(dateString)
    return asDate.toISOString().split('T')[0]
  }

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Origin: {coffee.bean.origin}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Roast Date: {formatDate(coffee.bean.roastDate)}</Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroupItem>Brew Method <p style={{ float: 'right' }}>{coffee.brewMethod}</p></ListGroupItem>
          <ListGroupItem>Coffee Weight (g) <p style={{ float: 'right' }}>{coffee.coffeeWeight}</p></ListGroupItem>
          <ListGroupItem>Final Weight (mL) <p style={{ float: 'right' }}>{coffee.finalWeight}</p></ListGroupItem>
          <ListGroupItem>Taste Rating <p style={{ float: 'right' }}>{coffee.tasteRating}</p></ListGroupItem>

          {
            coffee.brewNotes ?
              <ListGroupItem>
                <Accordion>
                  <Accordion.Toggle as={Card.Header} eventKey="0">Coffee Brew Notes</Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>{coffee.brewNotes}</Card.Body>
                  </Accordion.Collapse>
                </Accordion>
              </ListGroupItem>
              : null
          }
          {
            coffee.tasteNotes ?
              <ListGroupItem>
                <Accordion>
                  <Accordion.Toggle as={Card.Header} eventKey="1">Coffee Taste Notes</Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>{coffee.tasteNotes}</Card.Body>
                  </Accordion.Collapse>
                </Accordion>
              </ListGroupItem>
              : null
          }
          <ListGroupItem as="button" onClick={deleteNote} variant="danger">
            Delete
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default CoffeeInfo