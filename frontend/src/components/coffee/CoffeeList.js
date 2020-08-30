import React from 'react'
import CoffeeInfo from './CoffeeInfo'
import dimensions from '../../windowDimensions'
import { useSelector } from 'react-redux'

const CoffeeList = () => {
  const filterNotes = (note, filterProperty, filterOperation, filterPredicate) => {
    if (!filterPredicate || filterPredicate === '') {
      return true
    }

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

      switch(filterOperation) {
      case 'lessThan':
        return dateInObject < dateEntered
      case 'greaterThan':
        return dateInObject > dateEntered
      case 'equals':
        return dateInObject === dateEntered
      default: // this shouldnt be hit
        throw new Error('Switch case for filterNotes hit unexpected default. Set to', filterOperation)
      }
    }

    if ('number' === typeof propertyToTest) { // must support gt & lt & eq
      switch(filterOperation) {
      case 'lessThan':
        return propertyToTest < filterPredicate
      case 'greaterThan':
        return propertyToTest > filterPredicate
      case 'equals':
        return propertyToTest === Number(filterPredicate)
      default: // this shouldnt be hit
        throw new Error('Switch case for filterNotes hit unexpected default')
      }
    }

    if ('object' === typeof propertyToTest) { // a simple case. only supports "contains"
      return propertyToTest.ignoreCaseIncludes(filterPredicate)
    }
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