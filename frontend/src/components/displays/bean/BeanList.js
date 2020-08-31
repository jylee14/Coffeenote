import React, { useEffect } from 'react';
import Modal from 'react-modal'
import { useSelector } from 'react-redux';
import BeanInfo from './BeanInfo';

const BeanList = ({ style, userToken, isOpen, openModal, closeModal }) => {
  Modal.setAppElement('div')
  const convertDateString = date => new Date(date).toDateString()
  const rawData = useSelector(state => state.bean)  

  let beans = []
  useEffect(() => {
    if(rawData.length === 0) { return }
    console.log(rawData)
    for(let i = 0; i < rawData.beans.length; i++){
      const currentBean = rawData.beans[i]
      const referencedCoffee = rawData
        .coffeeNotes
        .filter(x => x.bean === currentBean.id)
      
      const referencedCounts = referencedCoffee.length
      const tasteRatings = referencedCoffee.map(x => x.tasteRating)
      const brewMethods = referencedCoffee.map(x => x.brewMethods)
      const averageTasteRating = Math.average(...tasteRatings)
      console.log(`${currentBean.origin}-${currentBean.roastDate} has been referenced ${referencedCounts} times and has avg rating of ${averageTasteRating}`)
    }
  }, [rawData])

  const linkStyle = {
    background: 'none',
    border: 'none',
    padding: '0',
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'black',
    float: 'left'
  }

  return (
    <ul>
      {
        beans.map(bean =>
          <li style={{ padding: '3px' }} key={bean.id}>
            <button onClick={openModal} style={linkStyle}>{bean.origin} ({convertDateString(bean.roastDate)})</button>

            <Modal isOpen={isOpen}
              onRequestClose={closeModal}
              contentLabel="Create new coffee note"
              style={style}>
              <BeanInfo bean={bean} />
            </Modal>
          </li>)
      }
    </ul>
  );
};

export default BeanList;