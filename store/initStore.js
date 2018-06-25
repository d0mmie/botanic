import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import imgDialog from './reducers/imageDialog'

export const initializeStore = (initialState = {}) => createStore(
  combineReducers({
    imgDialog
  }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)
