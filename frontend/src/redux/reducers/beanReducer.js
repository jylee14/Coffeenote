import service from '../../services/bean'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BEAN_DATA':
      return action.data
    default:
      return state
  }
}

export const initializeBeans = token => {
  return async dispatch => {
    const data = await service.getAll(token)
    dispatch({
      type: 'INITIALIZE_BEAN_DATA',
      data
    })
  }
}

export default reducer