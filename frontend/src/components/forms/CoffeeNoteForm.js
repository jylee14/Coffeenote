import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal'

import { createCoffeeNote } from '../../redux/reducers/coffeeReducer'

const CoffeeNoteForm = ({ style, userToken, isOpen, closeModal }) => {
  Modal.setAppElement('.App')
  const dispatch = useDispatch()

  const formatDate = date => {
    if ('object' === typeof date) {
      const isoDate = date.toISOString()
      return isoDate.split('T')[0]
    }
  }

  const [origin, setOrigin] = useState('')
  const [roastDate, setRoastDate] = useState(formatDate(new Date()))
  const [method, setMethod] = useState('')
  const [coffeeWeight, setCoffeeWeight] = useState(0)
  const [finalWeight, setFinalWeight] = useState(0)
  const [rating, setRating] = useState(1)
  const [brewNotes, setBrewNotes] = useState('')
  const [tasteNotes, setTasteNotes] = useState('')

  const createNote = e => {
    e.preventDefault()

    const coffee = {
      origin,
      roastDate: new Date(roastDate),
      coffeeWeight,
      finalWeight,
      brewMethod: method,
      tasteRating: rating,
      brewNotes,
      tasteNotes
    }

    setOrigin('')
    setRoastDate(formatDate(new Date()))
    setMethod('')
    setCoffeeWeight(0)
    setFinalWeight(0)
    setRating(1)
    setBrewNotes('')
    setTasteNotes('')

    dispatch(createCoffeeNote(userToken, coffee))
    closeModal()
  }


  return (

    <Modal id="newItemModal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Create new coffee note"
      style={style}>
      <div >
        <h2>Create new coffee note</h2>
        <form onSubmit={createNote}>
          <table>
            <tbody>
              <tr>
                <td>Coffee Origin</td>
                <td>
                  <input
                    type="text"
                    value={origin}
                    required={true}
                    onChange={({ target }) => setOrigin(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Roast Date</td>
                <td>
                  <input
                    type="date"
                    required={true}
                    value={roastDate}
                    onChange={({ target }) => {
                      setRoastDate(target.value)
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Brew Method</td>
                <td>
                  <input
                    type="text"
                    required={true}
                    value={method}
                    onChange={({ target }) => setMethod(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Coffee Weight (g)</td>
                <td>
                  <input
                    type="number"
                    required={true}
                    min="0"
                    step="0.1"
                    value={coffeeWeight}
                    onChange={({ target }) => setCoffeeWeight(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Final Weight (mL)</td>
                <td>
                  <input
                    type="number"
                    step="0.1"
                    required={true}
                    min={coffeeWeight}
                    value={finalWeight}
                    onChange={({ target }) => setFinalWeight(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Taste Rating</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={({ target }) => setRating(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Brew Notes</td>
                <td>
                  <textarea
                    value={brewNotes}
                    onChange={({ target }) => setBrewNotes(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Taste Notes</td>
                <td>
                  <textarea
                    value={tasteNotes}
                    onChange={({ target }) => setTasteNotes(target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button style={{ float: 'left' }} type="submit">submit</button>
            <button style={{ float: 'right' }} onClick={closeModal}>cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CoffeeNoteForm