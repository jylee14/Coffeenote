import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Accordion, Table, Card, Button } from 'react-bootstrap'

import { Counter } from '../../../misc/counter'
import { deleteBeans } from '../../../redux/reducers/beanReducer'

const BeanList = ({ beans, setBeans, userToken }) => {
  const dispatch = useDispatch()
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

  const deleteBean = bean => {
    if (bean.referencedCounts) {
      alert('Cannot delete beans that are still referenced by coffee notes')
      return
    }

    if (window.confirm('Are you sure you want to delete this bean?\nThis action cannot be undone.')) {
      dispatch(deleteBeans(bean.id, userToken))
    }
  }

  return (
    <div style={{ marginTop: '7vh' }}>
      <h3>Here are all the recorded beans</h3>
      <Accordion>
        {
          beans.map(bean =>
            <Card key={bean.id}>
              <Accordion.Toggle as={Card.Header} eventKey={bean.id}>
                {bean.origin} ({convertDateString(bean.roastDate)})
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={bean.id}>
                <div>
                  <Table>
                    <tbody>
                      <tr><td>Referenced</td><td>{bean.referencedCounts} times</td></tr>
                      <tr><td>Most commonly brewed with this bean</td><td>{bean.mostFrequentBrew || '-'} ({bean.brewFrequency} times)</td></tr>
                      <tr><td>Average taste rating with this bean</td><td>{bean.avgTasteRating || '-'}</td></tr>
                    </tbody>
                  </Table>
                  <Button variant="danger" onClick={() => deleteBean(bean)} block disabled={bean.referencedCounts}>
                    Delete
                  </Button>
                </div>
              </Accordion.Collapse>
            </Card>
          )
        }
      </Accordion>
    </div>
  )
}

export default BeanList