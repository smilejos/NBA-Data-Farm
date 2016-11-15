import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import commonReducer from './commonReducer'
import playerReducer from './playerReducer'

export const rootReducer = combineReducers({
    commonReducer,
    playerReducer,
  	routing: routerReducer
})
