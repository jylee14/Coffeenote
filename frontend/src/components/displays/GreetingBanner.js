import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { logout } from '../../redux/reducers/userReducer'

const GreetingBanner = ({ username }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('savedUser')
    dispatch(logout())
  }

  const padding = {
    paddingLeft: '1em',
    float: 'right'
  }
  return (
    <header>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">CoffeeNotes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" sticky="right">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span"><Link to="/coffee">Coffee</Link></Nav.Link>
            <Nav.Link href="#" as="span"><Link to="/bean">Beans</Link></Nav.Link>
          </Nav>
          <Navbar.Text className="justify-content-end">
            {username}&apos;s profile
          </Navbar.Text>
          <span style={padding}>
            <Button size="sm" onClick={handleLogout} variant="secondary">Logout</Button>
          </span>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

GreetingBanner.prototype = {
  username: PropTypes.string.isRequired
}

export default GreetingBanner