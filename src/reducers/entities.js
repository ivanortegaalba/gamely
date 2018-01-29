import { get } from 'lodash'

const initialEntities = {
  games: []
}
function entities (state = initialEntities, action) {
  if (action.response && action.response.entities) {
    let newState = Object.assign({}, state)
    for (let entity in action.response.entities) {
      if (action.response.entities.hasOwnProperty(entity)) {
        newState[entity] = {
          ...action.response.entities[entity]
        }
      }
    }
    return newState
  }
  return state
}

function actionNames (entityName) {
  entityName = entityName.toUpperCase()
  const requestType = entityName + '_REQUEST'
  const successType = entityName + '_SUCCESS'
  const failureType = entityName + '_FAILURE'

  return [requestType, successType, failureType]
}

export function fetchEntity ({ entityName, isList = true, isNormalized = true }) {
  let requestType
  let successType
  let failureType
  ;[requestType, successType, failureType] = actionNames(entityName)

  let initialState = { isFetching: false, error: false }

  if (isList === true) {
    initialState['items'] = []
  }
  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType: {
        return {
          isFetching: false,
          error: false,
          items: action.response.result
        }
      }
      case failureType:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
  }
}

export default entities
