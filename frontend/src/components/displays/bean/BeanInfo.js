import React from 'react';

const BeanInfo = ({ bean }) => {
  return (
    <div>
      {bean.origin} - {bean.roastDate}
    </div>
  )
}

export default BeanInfo;