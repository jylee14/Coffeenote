import React from 'react';
import CoffeeInfo from "./CoffeeInfo"
import dimensions from "../windowDimensions"

const CoffeeList = ({ coffeeData }) => {  
  const coffeeListStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    border: "10px",
    maxWidth: `${dimensions.width - 20}px`
  }
  return (    
    <div style={coffeeListStyle}>
        { coffeeData.map(coffee => <CoffeeInfo key={coffee.id} coffee={coffee} windowWidth={dimensions.width}></CoffeeInfo>) }
    </div>
  );
};

export default CoffeeList;