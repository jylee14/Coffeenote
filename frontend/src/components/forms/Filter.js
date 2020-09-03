import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { setFilterProperty, setFilterOperation, setFilterPredicate } from '../../redux/reducers/filterReducer'

const FilterProperties = ({ filterables }) => {
  const dispatch = useDispatch()
  const onChange = e => dispatch(setFilterProperty(e.target.value))

  // dispatch(setFilterProperty(filterables[0]))
  return (
    <Form.Control as="select" onChange={onChange} value={filterables[0]}>
      {
        filterables.map(filterable => <option key={filterable} value={filterable}>{filterable.capitalizeEach()}</option>)
      }
    </Form.Control>
  )
}

const FilterOperations = () => {
  const dispatch = useDispatch()
  const property = useSelector(state => state.filter.property)
  const onChange = e => dispatch(setFilterOperation(e.target.value))

  let operations
  if (property.ignoreCaseIncludes('date') || property.ignoreCaseIncludes('rating')) {
    operations = ['equals', 'less than', 'greater than']
  } else {
    operations = ['contains']
  }

  // dispatch(setFilterOperation(operations[0]))
  return (
    <Form.Control as="select" onChange={onChange} value={operations[0]}>
      {
        operations.map(operation => <option key={operation} value={operation}>{operation.capitalizeEach()}</option>)
      }
    </Form.Control>
  )
}

const FilterPredicate = () => {
  const dispatch = useDispatch()
  const onChange = e => dispatch(setFilterPredicate(e.target.value))

  return (
    <Form.Control name="filterPredicate"
      placeholder="Predicate"
      onChange={onChange}
    />
  )
}

const Filter = () => {
  const filterables = ['origin', 'roast date', 'brew method', 'taste rating', 'brew notes', 'taste notes']

  return (
    <Form>
      <Row>
        <Col><Form.Label size="xs">Filter</Form.Label></Col>
        <Col><FilterProperties filterables={filterables} /></Col>
        <Col><FilterOperations /></Col>
        <Col><FilterPredicate /></Col>
      </Row>
    </Form>
  )
}

export default Filter