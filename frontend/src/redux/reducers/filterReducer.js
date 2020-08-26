const defaultState = {
  property: '',
  operation: '',
  predicate: ''
}

export const setFilterProperty = (property) => {
  return {
    type: 'SET_FILTER_PROPERTY',
    data: { property }
  }
}

export const setFilterOperation = (operation) => {
  return {
    type: 'SET_FILTER_OPERATION',
    data: { operation }
  }
}

export const setFilterPredicate = (predicate) => {
  return {
    type: 'SET_FILTER_PREDICATE',
    data: { predicate }
  }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'SET_FILTER_PROPERTY':
    return {
      ...state,
      property: action.data.property
    }
  case 'SET_FILTER_OPERATION':
    return {
      ...state,
      operation: action.data.operation
    }
  case 'SET_FILTER_PREDICATE':
    return {
      ...state,
      predicate: action.data.predicate
    }
  case 'CLEAR_FILTER':
  default:
    return state
  }
}

export default reducer
