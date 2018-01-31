import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from '../actions/ActionTypes';
export const STORAGE_KEY = 'gamely-state-local-storage';

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
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

// TODO: Throttle the save data
export default store => next => action => {
  if ([ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES].indexOf(action.type) !== -1) {
    saveState(store);
  }
  next(action);
};
