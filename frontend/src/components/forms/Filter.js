import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterProperty, setFilterOperation, setFilterPredicate } from '../../redux/reducers/filterReducer'

const FilterProperties = ({ filterables }) => {
  const dispatch = useDispatch()
  const onChange = e => dispatch(setFilterProperty(e.target.value))

  return (
    <select onChange={onChange}>
      <option>---</option>
      {
        filterables.map(filterable => <option key={filterable} value={filterable.toCamelCase()}>{filterable.capitalizeEach()}</option>)
      }
    </select>
  )
}

const FilterOperations = () => {
  const dispatch = useDispatch()
  const property = useSelector(state => state.filter.property)
  const onChange = e => dispatch(setFilterOperation(e.target.value))

  let operations
  if(property.ignoreCaseIncludes('date') || property.ignoreCaseIncludes('rating')) {
    operations = ['equals', 'less than', 'greater than']
  } else {
    operations = ['contains']
  }

  return (
    <select onChange={onChange}>
      <option>---</option>
      {
        operations.map(operation => <option key={operation} value={operation.toCamelCase()}>{operation}</option>)
      }
    </select>
  )
}

const FilterPredicate = () => {
  const dispatch = useDispatch()
  const onChange = e => dispatch(setFilterPredicate(e.target.value))

  return (
    <input
      name="filterPredicate"
      type="text"
      placeholder="Predicate"
      onChange={onChange}
    />
  )
}

const Filter = () => {
  const filterables = ['origin', 'roast date', 'brew method', 'taste rating', 'brew notes', 'taste notes']

  return (
    <div>
      Filter
      <FilterProperties filterables={filterables} />
      <FilterOperations />
      <FilterPredicate />
    </div>
  )
}

export default Filter