import { getFavouriteGames, getFavouritesIds, getGame } from '../index'
import gameMock from '../../__tests__/__mocks__/game'

describe('selectors', () => {
  const state = {
    entities: {
      games: {
        '1': gameMock
      }
    },
    games: [gameMock],
    favourites: [1]
  }

  describe('getFavouritesIds', () => {
    it('should return all game IDs marked as favourites', () => {
      expect(getFavouritesIds(state)).toEqual([1])
    })
  })

  describe('getFavouriteGames', () => {
    it('should return all game entities marked as favourites', () => {
      expect(getFavouriteGames(state)).toEqual([gameMock])
    })
  })

  describe('getGame', () => {
    it('should return the game entities with a concrete ID', () => {
      expect(getGame(state, 1)).toEqual(gameMock)
    })
  })
})
