import gameMock from '../../__mocks__/game'
import { addToFavourites, fetchGames, filterGameBy, removeFromFavourites } from '../dispatchers'

describe('dispatchers', () => {
  describe('fetchGames', () => {
    const dispatch = jest.fn()
    it('should dispatch the api call action to fetch games', () => {
      fetchGames()(dispatch)
      expect(dispatch.mock.calls.length).toBe(1)
      expect(dispatch.mock.calls[0]).toMatchSnapshot()
    })
  })

  describe('addToFavourites', () => {
    const dispatch = jest.fn()
    describe('the game is already in favourites', () => {
      const getState = jest.fn().mockReturnValue({ favourites: [gameMock.short] })
      it('should not dispatch the action to save a game as favourite', () => {
        addToFavourites(gameMock.short)(dispatch, getState)
        expect(dispatch.mock.calls.length).toBe(0)
      })
    })
    describe('the game is not in favourites yet', () => {
      it('should dispatch the action to save a game as favourite', () => {
        const getState = jest.fn().mockReturnValue({ favourites: [] })
        addToFavourites(gameMock.short)(dispatch, getState)
        expect(dispatch.mock.calls.length).toBe(1)
        expect(dispatch.mock.calls[0]).toMatchSnapshot()
      })
    })
  })

  describe('removeFromFavourites', () => {
    const dispatch = jest.fn()
    describe('the game is not in favourites', () => {
      const getState = jest.fn().mockReturnValue({ favourites: [] })
      it('should not dispatch the action to remove a game as favourite', () => {
        removeFromFavourites(gameMock.short)(dispatch, getState)
        expect(dispatch.mock.calls.length).toBe(0)
      })
    })
    describe('the game is in favourites', () => {
      it('should dispatch the action to remove a game as favourite', () => {
        const getState = jest.fn().mockReturnValue({ favourites: [gameMock.short] })
        removeFromFavourites(gameMock.short)(dispatch, getState)
        expect(dispatch.mock.calls.length).toBe(1)
        expect(dispatch.mock.calls[0]).toMatchSnapshot()
      })
    })
  })

  describe('filterGamesBy', () => {
    const dispatch = jest.fn()
    it('should dispatch the action to change the filter value at the store', () => {
      const newValueToFilterBy = gameMock.short[0]
      filterGameBy(newValueToFilterBy)(dispatch)
      expect(dispatch.mock.calls.length).toBe(1)
      expect(dispatch.mock.calls[0]).toMatchSnapshot()
    })
  })
})
