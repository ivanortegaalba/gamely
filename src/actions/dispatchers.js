import * as actionCreators from './actionCreators';

export const fetchGames = () => dispatch => {
  dispatch(actionCreators.fetchGames());
};

const alreadyExistAsFavourite = (state, shortName) =>
  state.favourites.indexOf(shortName) !== -1;

export const addToFavourites = shortName => (dispatch, getState) => {
  if (!alreadyExistAsFavourite(getState(), shortName)) {
    dispatch(actionCreators.addToFavouritesUnsafe(shortName));
  }
};

export const removeFromFavourites = shortName => (dispatch, getState) => {
  if (alreadyExistAsFavourite(getState(), shortName)) {
    dispatch(actionCreators.removeFromFavouritesUnsafe(shortName));
  }
};

export const filterGameBy = gameName => dispatch => {
  dispatch(actionCreators.filterGamesBy(gameName));
};
