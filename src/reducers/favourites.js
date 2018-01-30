import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../actions/ActionTypes'

const initialState = []

const favourites = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      if (state.indexOf(action.shortName) !== -1) {
        return state
      }
      return [...state, action.shortName]
    case REMOVE_FROM_FAVOURITES:
      if (state.indexOf(action.shortName) !== -1) {
        return state.filter(shortName => shortName !== action.shortName)
      }
      return state
    default:
      return state
  }
}

const getFavouritesIds = (state) => {
  return state
}

export const selectors = {
  getFavouritesIds
}
export const reducers = {
  favourites
}
export default favourites
