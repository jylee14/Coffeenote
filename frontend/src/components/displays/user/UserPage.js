import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import BeanList from '../bean/BeanList'
import UserStats from './UserStats'
import CoffeePage from '../coffee/CoffeePage'

const UserPage = ({ user }) => {
  const [beans, setBeans] = useState([])

  return (
    <div>
      <Switch>
        <Route path="/bean">
          <BeanList beans={beans} setBeans={setBeans} userToken={user.token} />
        </Route>
        <Route path="/coffee">
          <CoffeePage user={user} />
        </Route>
        <Route path="/">
          <UserStats />
        </Route>
      </Switch>
    </div>
  )
}

export default UserPage