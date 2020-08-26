import React from 'react';
import { setFilterProperty, setFilterOperation, setFilterPredicate } from "../../redux/reducers/filterReducer"
import { useDispatch } from 'react-redux';

const FilterProperties = ({ filterables }) => {
  const dispatch = useDispatch()
  const onChange = e => dispatch(setFilterProperty(e.target.value))

  return (
    <select onChange={onChange}>
      {
        filterables.map(filterable => <option key={filterable} value={filterable.toCamelCase()}>{filterable.capitalizeEach()}</option>)
      }
    </select>
  )
}

const FilterOperations = () => {
  const dispatch = useDispatch()
  const onChange = e => dispatch(setFilterOperation(e.target.value))

  let operations = ["contains"]
  return (
    <select onChange={onChange}>
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
  const filterables = ["origin", "roast date", "brew method", "brew notes", "taste notes"]

  return (
    <div>
      Filter
      <FilterProperties filterables={filterables} />
      <FilterOperations />
      <FilterPredicate />
    </div>
  );
};

export default Filter;