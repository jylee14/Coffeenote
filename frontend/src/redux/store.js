import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import coffeeReducer from "./reducers/coffeeReducer"
import notifyReducer from "./reducers/notifyReducer"

const reducers = combineReducers({
  coffee: coffeeReducer,
  notify: notifyReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store