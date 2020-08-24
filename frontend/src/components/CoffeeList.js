import React from 'react';
import CoffeeInfo from "./CoffeeInfo"

const CoffeeList = ({ coffeeData }) => {  
  return (
    <div>
      <ul>
        { coffeeData.map(coffee => <CoffeeInfo key={coffee.id} coffee={coffee}></CoffeeInfo>) }
      </ul>      
    </div>
  );
};

export default CoffeeList;