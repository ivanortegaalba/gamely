import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../constants/ActionTypes'
import throttle from 'lodash/throttle';
const STORAGE_KEY = 'gamely-state-local-storage'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}

export default store => next => action => {
  if (action.type in [ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES]){
    saveState(store)
  }
  next(action)
}
