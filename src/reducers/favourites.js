import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../constants/ActionTypes'

const initialState = []

export default (state = initialState, action) => {
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

export const getFavouritesIds = (state) => {
  return state
}
