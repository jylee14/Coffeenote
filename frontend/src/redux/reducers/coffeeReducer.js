import service from '../../services/coffee'
import { initializeBeans } from './beanReducer'

const reducer = (state = [], action) => {
  switch(action.type)  {
  case 'INIT_COFFEE_NOTES':
    return action.data
  case 'CREATE_COFFEE_NOTE':
    return [...state, action.data]
  case 'DELETE_COFFEE_NOTE':
    return state.filter(coffee => coffee.id !== action.data.id)
  default:
    return state
  }
}

export const initializeCoffee = (token) => {
  return async dispatch => {
    const initialNotes = await service.getCoffeeNotes(token)
    dispatch({
      type: 'INIT_COFFEE_NOTES',
      data: initialNotes
    })
  }
}

export const createCoffeeNote = (token, data) => {
  return async dispatch => {
    const res = await service.create(token, data)
    dispatch(initializeBeans(token))
    dispatch({
      type: 'CREATE_COFFEE_NOTE',
      data: res
    })
  }
}

export const deleteCoffeeNote = (token, id) => {
  return async dispatch => {
    await service.deleteCoffeeNote(token, id)
    dispatch(initializeBeans(token)) // re-load the bean store
    dispatch({
      type: 'DELETE_COFFEE_NOTE',
      data: { id }
    })
  }
}

export default reducer