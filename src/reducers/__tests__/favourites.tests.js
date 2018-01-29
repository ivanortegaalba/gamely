import favourites from '../favourites'
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../../constants/ActionTypes'

describe('reducers', () => {
  describe('favourites', () => {
    const initialState = []

    it('should provide the initial state', () => {
      expect(favourites(undefined, {})).toEqual(initialState)
    })

    describe('when a game is already favourite', () => {
      const gameId = 1
      const state = [gameId]

      it('should handle ADD_TO_FAVOURITES action', () => {
        expect(favourites(state, { type: 'ADD_TO_FAVOURITES', gameId })).toEqual([gameId])
      })

      it('should handle REMOVE_FROM_FAVOURITES action', () => {
        const gameId = 1
        expect(favourites([gameId], { type: 'REMOVE_FROM_FAVOURITES', gameId })).toEqual([])
      })

    })

    describe('when a game is not favourite', () => {
      it('should handle ADD_TO_FAVOURITE action', () => {
        const gameId = 1
        expect(favourites([], { type: 'ADD_TO_FAVOURITES', gameId })).toEqual([gameId])
      })

      it('should handle REMOVE_FROM_FAVOURITES action', () => {
        const gameId = 1
        const state = []
        expect(favourites(state, { type: 'REMOVE_FROM_FAVOURITES', gameId })).toEqual([])
      })
    })
  })
})
