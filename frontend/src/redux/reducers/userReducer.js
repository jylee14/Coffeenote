import userService from '../../services/user'
import loginService from '../../services/login'

export const initialLoad = () => {
  const savedUserString = window.localStorage.getItem('savedUser')
  const user = savedUserString ? JSON.parse(savedUserString) : null
  return {
    type: 'INITIAL_LOAD',
    user
  }
}

export const createUser = (username, password) => {
  return async dispatch => {
    try {
      await userService.create(username, password)
      dispatch(login(username, password))
    } catch (err) {
      const message = err.response.data.error
      throw new Error(message)
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('savedUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        user
      })
    } catch (err) {
      const message = err.response.data.error
      throw new Error(message)
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('savedUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'INITIAL_LOAD':
    return action.user
  case 'LOGIN':
    return action.user
  case 'CREATE':
    return null
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default reducer