import React from 'react'
import { deleteBeans } from '../../../redux/reducers/beanReducer'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const BeanInfo = ({ bean, userToken }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  if (!bean) { return null }
  const convertDateString = date => new Date(date).toDateString()
  const deleteBean = () => {
    if(bean.referencedCounts) {
      alert('Cannot delete beans that are still referenced by coffee notes')
      return
    }

    if(window.confirm('Are you sure you want to delete this bean?\nThis action cannot be undone.')) {
      dispatch(deleteBeans(bean.id, userToken))
      history.push('/bean')
    }
  }

  return (
    <div style={{ marginTop: '7vh' }}>
      <h3>{bean.origin} - {convertDateString(bean.roastDate)}</h3>
      <ul className='infoList'>
        <li>Referenced {bean.referencedCounts} times</li><br/>
        <li>Most commonly brewed with this bean {bean.mostFrequentBrew || '-'} ({bean.brewFrequency} times)</li><br/>
        <li>Average taste rating with this bean {bean.avgTasteRating || '-'}</li><br/>
      </ul>
      <button onClick={deleteBean}>Delete</button>
    </div>
  )
}

export default BeanInfo