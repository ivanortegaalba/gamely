import * as types from './ActionTypes'
import { CALL_API } from '../middleware/api'
import schemas  from '../schemas'

export const fetchGames = () => ({
  [CALL_API]: {
    types: types.FETCH_GAMES,
    endpoint: `${process.env.PUBLIC_URL}/resources/games.json`,
    schema: schemas.games
  }
})

export const addToFavouritesUnsafe = shortName => ({
  type: types.ADD_TO_FAVOURITES,
  shortName
})

export const removeFromFavouritesUnsafe = shortName => ({
  type: types.REMOVE_FROM_FAVOURITES,
  shortName
})

export const filterGamesBy = name => ({
  type: types.FILTER_BY,
  filterBy: name
})
