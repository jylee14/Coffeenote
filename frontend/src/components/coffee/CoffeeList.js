import React from 'react';
import CoffeeInfo from "./CoffeeInfo"
import dimensions from "../../windowDimensions"
import { useSelector } from 'react-redux';

const CoffeeList = () => {
  const coffeeData = useSelector(state => {
    const allNotes = state.coffee
    const filterProperty = state.filter.property
    const filterOperation = state.filter.operation
    const filterPredicate = state.filter.predicate.toLowerCase()

    if (!filterPredicate || filterPredicate === '') {
      return allNotes
    }

    return allNotes.filter(note => {
      if (filterProperty in note) {
        return note[filterProperty].ignoreCaseIncludes(filterPredicate)
      }
      // we must go deeper since the prop isnt at the top level
      for (let key in note) {
        if (typeof note[key] !== 'object') { continue }
        if (filterProperty in note[key]) {
          return note[key][filterProperty].ignoreCaseIncludes(filterPredicate)
        }
      }
    })
  })

  const coffeeListStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    border: "10px",
    maxWidth: `${dimensions.width - 20}px`
  }
  return (
    <div style={coffeeListStyle}>
      {coffeeData.map(coffee => <CoffeeInfo key={coffee.id} coffee={coffee} windowWidth={dimensions.width}></CoffeeInfo>)}
    </div>
  );
};

export default CoffeeList;