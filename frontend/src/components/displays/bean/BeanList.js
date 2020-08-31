import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Counter } from '../../../misc/counter'

const BeanList = ({ beans, setBeans }) => {
  const convertDateString = date => new Date(date).toDateString()
  const rawData = useSelector(state => state.bean)

  useEffect(() => {
    if (rawData.length === 0) { return }

    let processedBeans = []
    for (let i = 0; i < rawData.beans.length; i++) {
      const currentBean = rawData.beans[i]
      const referencedCoffee = rawData
        .coffeeNotes
        .filter(x => x.bean === currentBean.id)

      const referencedCounts = referencedCoffee.length
      const tasteRatings = referencedCoffee.map(x => x.tasteRating)
      const avgTasteRating = Math.average(...tasteRatings)
      const brewCounter = new Counter(referencedCoffee.map(x => x.brewMethod))
      const mostFrequent = brewCounter.mostFrequent

      processedBeans = processedBeans.concat({
        id: currentBean.id,
        origin: currentBean.origin,
        roastDate: currentBean.roastDate,
        referencedCounts,
        avgTasteRating,
        mostFrequentBrew: mostFrequent.element,
        brewFrequency: mostFrequent.frequency
      })
    }
    setBeans(processedBeans)
  }, [rawData, setBeans])

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
    <div style={{ marginTop: '7vh' }}>
      <h3>Here are all the recorded beans</h3>
      <ul>
        {
          beans.map(bean =>
            <li key={bean.id} style={{ padding: '3px' }} >
              <Link to={`/beanDetail/${bean.id}`} style={linkStyle}>{bean.origin} ({convertDateString(bean.roastDate)})</Link>
              {/* <button style={linkStyle}>{bean.origin} ({convertDateString(bean.roastDate)})</button> */}
            </li>)
        }
      </ul>
    </div>
  )
}

export default BeanList