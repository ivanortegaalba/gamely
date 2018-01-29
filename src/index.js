import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import configureStore from './stores/configureStore'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { throttle } from 'lodash'
import { loadState, saveState } from './middleware/localStorage'

const middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const initialStore = loadState()
const store = configureStore(initialStore)

// Initialize the store with the local storage data
store.subscribe(throttle(() => {
  saveState({
    entities: store.getState().entities,
    games: store.getState().games,
    favourites: store.getState().favourites
  })
}, 1000))

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))

registerServiceWorker()
