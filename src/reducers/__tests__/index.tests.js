import { selectors } from '../index'
import gameMock from '../../__mocks__/game'

describe('selectors', () => {
  const { getFavouritesIds, getFilterBy, getAllGames, getFavouriteGames, getGame} = selectors
  const state = {
    entities: {
      games: {
        [gameMock.short]: gameMock
      }
    },
    games: {
      isFetching: false,
      error: false,
      items: [gameMock.short]
    },
    favourites: [gameMock.short],
    filterBy: ''
  }

  describe('getFavouritesIds', () => {
    it('should return all game IDs marked as favourites', () => {
      expect(getFavouritesIds(state)).toEqual([gameMock.short])
    })
  })

  describe('getFavouriteGames', () => {
    it('should return all game entities marked as favourites', () => {
      expect(getFavouriteGames(state)).toEqual([{ ...gameMock, isFavourite: true }])
    })
  })

  describe('getGame', () => {
    it('should return the game entities with a concrete ID', () => {
      expect(getGame(state, gameMock.short)).toEqual(gameMock)
    })
  })

  describe('getFilterBy', () => {
    const stateFiltered = { ...state, filterBy: 'whatever' }
    it('should return the value which is filtering the games', () => {
      expect(getFilterBy(stateFiltered)).toEqual('whatever')
    })
  })

  describe('getAllGames', () => {
    const gameWithFavouriteFlag = { ...gameMock, isFavourite: true }
    it('should return the game entities with the favourite flag', () => {
      expect(getAllGames(state)).toEqual([gameWithFavouriteFlag])
    })
  })
})
