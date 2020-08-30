import React from 'react'
import CoffeeInfo from './CoffeeInfo'
import dimensions from '../../windowDimensions'
import { useSelector } from 'react-redux'

const CoffeeList = () => {
  const evaluate = (a, b, operation) => {
    switch(operation) {
    case 'lessThan':
      return a < b
    case 'greaterThan':
      return a > b
    case 'equals':
      return a === b
    default: // this shouldnt be hit
      throw new Error('Switch case for filterNotes hit unexpected default')
    }    
  }

  const filterNotes = (note, filterProperty, filterOperation, filterPredicate) => {
    if (!filterPredicate || filterPredicate === '') { return true }

    let propertyToTest // this is the prop inside the note that will be checked
    if (filterProperty in note) {
      propertyToTest = note[filterProperty]
    } else { // we must go deeper since the prop isnt at the top level. Only going down 1 more level
      for (let key in note) {
        if (typeof note[key] !== 'object') { continue }
        if (filterProperty in note[key]) {
          propertyToTest = note[key][filterProperty]
        }
      }
    }

    if (filterProperty.ignoreCaseIncludes('date')) {  // date time filtering
      const dateInObject = new Date(propertyToTest)
      const dateEntered = filterPredicate.toISODate()
      return evaluate(dateInObject, dateEntered, filterOperation)
    }

    if ('number' === typeof propertyToTest) { // must support gt & lt & eq
      return evaluate(propertyToTest, Number(filterPredicate), filterOperation)
    }

    return propertyToTest.ignoreCaseIncludes(filterPredicate)    
  }

  const coffeeData = useSelector(state => {
    const allNotes = state.coffee
    const filterProperty = state.filter.property
    const filterOperation = state.filter.operation
    const filterPredicate = state.filter.predicate.toLowerCase()

    return allNotes.filter(note => filterNotes(note, filterProperty, filterOperation, filterPredicate))
  })

  const width = dimensions().width
  const coffeeListStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: '10px',
    maxWidth: `${width - 20}px`
  }
  return (
    <div style={coffeeListStyle}>
      {coffeeData.map(coffee => <CoffeeInfo key={coffee.id} coffee={coffee} width={width}></CoffeeInfo>)}
    </div>
  )
}

export default CoffeeList