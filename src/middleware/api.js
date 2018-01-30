/* globals fetch */
import 'isomorphic-fetch'
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

// Fetches an API response and normalizes the result JSON according
// to schema.  This makes every API response have the same shape,
// regardless of how nested it was.
export async function callApi (endpoint, schema) {
  const response = await fetch(endpoint)
  const json = await response.json()
  if (!response.ok) {
    throw Error(json)
  }
  return normalize(camelizeKeys(json), schema)
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  if (!action.hasOwnProperty(CALL_API)) {
    return next(action)
  }
  const { endpoint, schema, types } = action[CALL_API]

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  // Get the final info to dispatch to the reducers, removing the api stuff
  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  // Dispatch the action as the call has been done
  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema).then(
    response =>
      next(
        actionWith({
          response,
          type: successType
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || 'Call Api request failed'
        })
      )
  )
}
