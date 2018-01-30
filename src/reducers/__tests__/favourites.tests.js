import favourites from '../favourites'
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../../actions/ActionTypes'

describe('reducers', () => {
  describe('favourites', () => {
    const initialState = []

    it('should provide the initial state', () => {
      expect(favourites(undefined, {})).toEqual(initialState)
    })

    describe('when a game is already favourite', () => {
      const shortName = 'gameshortname'
      const state = [shortName]

      it('should handle ADD_TO_FAVOURITES action', () => {
        expect(favourites(state, { type: 'ADD_TO_FAVOURITES', shortName })).toEqual([shortName])
      })

      it('should handle REMOVE_FROM_FAVOURITES action', () => {
        const shortName = 1
        expect(favourites([shortName], { type: 'REMOVE_FROM_FAVOURITES', shortName })).toEqual([])
      })

    })

    describe('when a game is not favourite', () => {
      it('should handle ADD_TO_FAVOURITE action', () => {
        const shortName = 1
        expect(favourites([], { type: 'ADD_TO_FAVOURITES', shortName })).toEqual([shortName])
      })

      it('should handle REMOVE_FROM_FAVOURITES action', () => {
        const shortName = 1
        const state = []
        expect(favourites(state, { type: 'REMOVE_FROM_FAVOURITES', shortName })).toEqual([])
      })
    })
  })
})
