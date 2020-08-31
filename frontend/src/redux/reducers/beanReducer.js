import service from '../../services/bean'

const initialState = {
  coffeeNotes: [],
  beans: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INITIALIZE_BEAN_DATA':
    return action.data
  case 'DELETE_BEAN_DATA':
    return {
      ...state,
      beans: state.beans.filter(x => x.id !== action.data.id)
    }
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

export const deleteBeans = (id, token) => {
  return async dispatch => {
    await service.deleteBean(id, token)
    dispatch({
      type: 'DELETE_BEAN_DATA',
      data: { id }
    })
  }
}

export default reducer