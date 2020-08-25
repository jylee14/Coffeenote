import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import coffeeReducer from "./reducers/coffeeReducer"

const reducers = combineReducers({
  coffee: coffeeReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store