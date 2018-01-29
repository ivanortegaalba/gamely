import { combineReducers } from 'redux'
import favourites, * as fromFavourites from './favourites'
import filterBy, * as fromFilter from './filter'
import entities, * as fromEntities from './entities'
import { get } from 'lodash'

export default combineReducers({
  entities,
  favourites,
  filterBy,
  games: fromEntities.fetchEntity({ entityName: 'GAMES' })
})

export const getFavouritesIds = state => fromFavourites.getFavouritesIds(state.favourites)

export const getGame = (state, shortName) => state.entities.games[shortName]

export const getFavouriteGames = (state) => getFavouritesIds(state).map(gameId => ({
  ...getGame(state, gameId),
  isFavourite: true
}))

export const getFilterBy = (state) => fromFilter.getFilterBy(state.filterBy)

export const getAllGames = (state) => {
  const favourites = getFavouritesIds(state)
  return get(state, 'games.items', [])
    .map(shortName => ({
      ...getGame(state, shortName),
      isFavourite: favourites.indexOf(shortName) !== -1
    }))

}
