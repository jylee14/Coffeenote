import React from 'react';

const BeanInfo = ({ bean }) => {
  const formatDate = (dateString) => {
    const asDate = new Date(dateString)
    return asDate.toISOString().split('T')[0]
  }

  return (
    <tbody>
      <tr>
        <td>Origin</td>
        <td>{bean.origin}</td>
      </tr>
      <tr>
        <td>Roast Date</td>
        <td>{formatDate(bean.roastDate)}</td>
      </tr>
    </tbody>
  )
}

const BrewInfo = ({ coffee }) => {
  return (
    <tbody>
      <tr>
        <td>Brew Method</td>
        <td>{coffee.brewMethod}</td>
      </tr>
      <tr>
        <td>Weight of Bean (g)</td>
        <td>{coffee.coffeeWeight}</td>
      </tr>
      <tr>
        <td>Final Weight (mL)</td>
        <td>{coffee.finalWeight}</td>
      </tr>
      <tr>
        <td>Taste Rating</td>
        <td>{coffee.tasteRating}</td>
      </tr>
      {
        coffee.brewNotes ?
          <tr>
            <td>Brew Notes</td>
            <td><pre>{coffee.brewNotes}</pre></td>
          </tr>
          : null
      }
      {
        coffee.tasteNotes ? 
          <tr>
            <td>Taste Notes</td>
            <td><pre>{coffee.tasteNotes}</pre></td>            
          </tr>
          : null
      }
    </tbody>
  )
}

const tableStyle = {
  margin: "10px",
  border: "black",
  borderStyle: "solid",
  borderWidth: "1px",
  boxSizing: "border-box"
}

const CoffeeInfo = ({ coffee }) => (
  <table style={tableStyle}>
    <BeanInfo bean={coffee.bean}></BeanInfo>
    <BrewInfo coffee={coffee}></BrewInfo>
  </table>
)

export default CoffeeInfo;