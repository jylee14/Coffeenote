import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from "./reducers/userReducer"
import coffeeReducer from "./reducers/coffeeReducer"
import notifyReducer from "./reducers/notifyReducer"
import filterReducer from "./reducers/filterReducer"

const reducers = combineReducers({
  user: userReducer,
  coffee: coffeeReducer,
  notify: notifyReducer,
  filter: filterReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store