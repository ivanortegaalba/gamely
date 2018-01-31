import { combineReducers } from 'redux';
import { get } from 'lodash';
import {
  reducers as favouritesReducers,
  selectors as favouritesSelectors,
} from './favourites';
import {
  reducers as filterByReducers,
  selectors as filterBySelectors,
} from './filter';
import { reducers as entitiesReducer } from './entities';

// TODO: Comment functions

const getFavouritesIds = state =>
  favouritesSelectors.getFavouritesIds(state.favourites);

// TODO: Use a entity selector in order to access into entities.
const getGame = (state, shortName) => state.entities.games[shortName];

const getFavouriteGames = state =>
  getFavouritesIds(state).map(gameId => ({
    ...getGame(state, gameId),
    isFavourite: true,
  }));

const getFilterBy = state => filterBySelectors.getFilterBy(state.filterBy);

const getAllGames = state => {
  const favourites = getFavouritesIds(state);
  return get(state, 'games.items', []).map(shortName => ({
    ...getGame(state, shortName),
    isFavourite: favourites.indexOf(shortName) !== -1,
  }));
};

const rootReducer = combineReducers({
  entities: entitiesReducer.entities,
  favourites: favouritesReducers.favourites,
  filterBy: filterByReducers.filterBy,
  games: entitiesReducer.fetchEntity('GAMES'),
});

export const reducers = {
  rootReducer,
  ...entitiesReducer,
  ...favouritesReducers,
  ...filterByReducers,
  ...filterByReducers,
  ...entitiesReducer,
  fetchEntityGames: entitiesReducer.fetchEntity('GAMES'),
};

export const selectors = {
  getFavouritesIds,
  getGame,
  getFavouriteGames,
  getFilterBy,
  getAllGames,
};

export default rootReducer;
