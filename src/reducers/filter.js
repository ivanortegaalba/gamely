import { FILTER_BY } from '../actions/ActionTypes'

const initialState = ''

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY:
      return action.filterBy
    default:
      return state
  }
}

export const getFilterBy = (state) => {
  return state
}
