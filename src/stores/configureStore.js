import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import api from '../middleware/api'
import localStorage from '../middleware/localStorage'
import { createLogger } from 'redux-logger'

export default function configureStore (initialState) {

  if (process.env.NODE_ENV === 'production') {
    return createStore(rootReducer, initialState, compose(applyMiddleware(thunk, api, localStorage)))
  } else {
    return createStore(rootReducer, initialState, compose(applyMiddleware(thunk, api, localStorage, createLogger())))
  }
}
