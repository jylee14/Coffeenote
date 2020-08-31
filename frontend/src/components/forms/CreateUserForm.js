import React from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../../redux/reducers/notifyReducer'
import { createUser } from '../../redux/reducers/userReducer'
import { useHistory } from 'react-router-dom'

const CreateUserForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleCreateNewUser = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value
    try {
      dispatch(createUser(username, password))
      dispatch(notify(`new profile for ${username} created successfully!`, false))

      e.target.username.value = ''
      e.target.password.value = ''
      history.push('/login')
    }catch(e){
      dispatch(notify(`Failed to create a new user: ${e.message}`, true))
    }
  }

  return (
    <div>
      <h3>New to CoffeeNote? Create a profile!</h3>
      <form onSubmit={handleCreateNewUser}>
        <div>
          username
          <input
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <button onClick={() => history.push('/')}>Cancel</button>
    </div>
  )
}

export default CreateUserForm