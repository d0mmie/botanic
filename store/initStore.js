import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'

import addTree from './reducers/addTree'
import imgDialog from './reducers/imageDialog'

export const initializeStore = (initialState = {}) => createStore(
  combineReducers({
    imgDialog,
    addTree,
    form
  }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)
