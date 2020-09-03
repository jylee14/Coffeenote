export const notify = (message, isError=false, timeout = 2) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFY',
      isError,
      message
    })

    setTimeout(() => {
      dispatch(turnOffNotification())
    }, timeout * 1000)
  }
}

const turnOffNotification = () => {
  return {
    type: 'TURNOFF_NOTIFICATION'
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFY':
    return  {
      message: action.message,
      isError: action.isError
    }
  case 'TURNOFF_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export default reducer