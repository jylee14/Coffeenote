import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Counter } from '../../../misc/counter'

const UserStats = () => {
  const rawData = useSelector(state => state.bean)
  const coffeeData = useSelector(state => state.coffee)

  const reducer = (acc, curr) => Number(acc) + Number(curr)

  const beansInStore = rawData.beans.length
  const coffeesBrewed = rawData.coffeeNotes.length
  const beanWeightGram = coffeeData
    .map(x => x.coffeeWeight)
    .reduce(reducer, 0)
  const coffeeWeightTotal = coffeeData
    .map(x => x.finalWeight)
    .reduce(reducer, 0)
  const mostPurchasedOrigin = new Counter(
    rawData.beans
      .map(x => x.origin))
    .mostFrequent.element

  return (
    <div>
      <h1>Some stats for you</h1>
      <Table striped>
        <tbody>
          <tr>
            <td><strong>{beansInStore}</strong></td>
            <td>Number of beans used</td>
          </tr>
          <tr>
            <td><strong>{mostPurchasedOrigin || '-'}</strong></td>
            <td>Most purchased coffee origin</td>
          </tr>
          <tr>
            <td><strong>{coffeesBrewed}</strong></td>
            <td>Total number of drinks brewed</td>
          </tr>
          <tr>
            <td><strong>{beanWeightGram}g</strong></td>
            <td>Weight of coffee beans used</td>
          </tr>
          <tr>
            <td><strong>{(coffeeWeightTotal / 1000).toFixed(2)}L</strong></td>
            <td>Volume of coffee brewed</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default UserStats