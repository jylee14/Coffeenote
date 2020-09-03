import React from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal'

import { createCoffeeNote } from '../../redux/reducers/coffeeReducer'
import { useInputField } from '../../hooks/inputField'

const CoffeeNoteForm = ({ style, userToken, isOpen, closeModal }) => {
  Modal.setAppElement('.container')
  const dispatch = useDispatch()

  const formatDate = date => {
    if ('object' === typeof date) {
      const isoDate = date.toISOString()
      return isoDate.split('T')[0]
    }
  }

  const origin = useInputField('')
  const roastDate = useInputField(formatDate(new Date()), 'date')
  const method = useInputField('')
  const coffeeWeight = useInputField(0)
  const finalWeight = useInputField(0)
  const rating = useInputField(1)
  const brewNotes = useInputField('')
  const tasteNotes = useInputField('')

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

    // origin.clear()
    // roastDate.clear()
    // coffeeWeight.clear()
    // finalWeight.clear()
    // method.clear()
    // rating.clear()
    // brewNotes.clear()
    // tasteNotes.clear()

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
                  <input required={true} {...origin} />
                </td>
              </tr>
              <tr>
                <td>Roast Date</td>
                <td>
                  <input required={true} {...roastDate} />
                </td>
              </tr>
              <tr>
                <td>Brew Method</td>
                <td>
                  <input required={true} {...method} />
                </td>
              </tr>
              <tr>
                <td>Coffee Weight (g)</td>
                <td>
                  <input {...coffeeWeight}
                    required={true}
                    min="0"
                    step="0.1"
                  />
                </td>
              </tr>
              <tr>
                <td>Final Weight (mL)</td>
                <td>
                  <input {...finalWeight}
                    step="0.1"
                    required={true}
                    min={coffeeWeight}
                  />
                </td>
              </tr>
              <tr>
                <td>Taste Rating</td>
                <td>
                  <input {...rating}
                    min="1"
                    max="5"
                    value={rating.value}
                    onChange={rating.onChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Brew Notes</td>
                <td>
                  <textarea {...brewNotes} />
                </td>
              </tr>
              <tr>
                <td>Taste Notes</td>
                <td>
                  <textarea {...tasteNotes} />
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