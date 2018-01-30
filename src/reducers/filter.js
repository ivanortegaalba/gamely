import { FILTER_BY } from '../actions/ActionTypes'

const initialState = ''

const filterBy = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY:
      return action.filterBy
    default:
      return state
  }
}


const getFilterBy = (state) => {
  return state
}

export const reducers = {
  filterBy
}
export const selectors = {
  getFilterBy
}
export default filterBy
