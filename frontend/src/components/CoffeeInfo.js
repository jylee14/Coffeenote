import React from 'react';

const BeanInfo = ({ bean }) => {
  const formatDate = (dateString) => {
    const asDate = new Date(dateString)
    return asDate.toISOString().split('T')[0]
  }

  return(
    <div>
      <div>origin: {bean.origin}</div>
      <div>roast data: {formatDate(bean.roastDate)}</div>
    </div>
  )
}

const BrewInfo = ({ coffee }) => {
  return (
    <div>
      <div>Brew Method: {coffee.brewMethod}</div>      
      <div>Weight of Bean: {coffee.coffeeWeight}</div>
      <div>Final Coffee Weight: {coffee.finalWeight}</div>
      <div>Taste Rating: {coffee.tasteRating}</div>
      {
        coffee.brewNotes ? 
        <div>
          Brew Notes:
          <p>{coffee.brewNotes}</p>
        </div>
        : null
      }
    </div>
  )
}

const CoffeeInfo = ({ coffee }) => (
  <div>
    <div>
      bean data 
      <BeanInfo bean={coffee.bean}></BeanInfo>
    </div>
    <div>
      brew info: 
      <BrewInfo coffee={coffee}></BrewInfo>
    </div>
  </div>
)

export default CoffeeInfo;