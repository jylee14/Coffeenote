import React, { useState } from 'react';

const CoffeeNoteForm = ({ handleCreate }) => {
  const formatDate = date => {
    if("object" === typeof date) {
      const isoDate = date.toISOString()
      return isoDate.split("T")[0]
    }
  }

  const [origin, setOrigin] = useState("")
  const [roastDate, setRoastDate] = useState(formatDate(new Date()))
  const [method, setMethod] = useState("")
  const [coffeeWeight, setCoffeeWeight] = useState(0)
  const [finalWeight, setFinalWeight] = useState(0)
  const [rating, setRating] = useState(1)
  const [brewNotes, setBrewNotes] = useState("")
  const [tasteNotes, setTasteNotes] = useState("")

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

    handleCreate(coffee)
  }

  return (
    <div>
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
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CoffeeNoteForm;