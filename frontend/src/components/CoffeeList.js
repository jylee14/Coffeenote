import React from 'react';
import CoffeeInfo from "./CoffeeInfo"

const CoffeeList = ({ coffeeData }) => {  
  return (
    <div style={{ display: "flex"}}>
        { coffeeData.map(coffee => <CoffeeInfo key={coffee.id} coffee={coffee}></CoffeeInfo>) }
    </div>
  );
};

export default CoffeeList;