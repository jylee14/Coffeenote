import userService from "../../services/user"
import loginService from "../../services/login"

export const initialLoad = () => {
  const savedUserString = window.localStorage.getItem("savedUser")
  const user = savedUserString ? JSON.parse(savedUserString) : null
  return {
    type: "INITIAL_LOAD",
    user
  }
}

export const login = ({ username, password}) => {
  return async dispatch => {
    const user = await loginService.login({
      username, 
      password
    })
    if(user) {
      window.localStorage.setItem("savedUser", JSON.stringify(user))
      console.log(user)
      dispatch({
        type: "LOGIN",
        user
      })
    } else {
      throw Error("Failed to log in")
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem("savedUser")
    dispatch({
      type: "LOGOUT"
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case "INITIAL_LOAD":
      console.log("hello world", action)
      return action.user
    case "LOGOUT":
      return null
    default:
      return state
  }
}

export default reducer