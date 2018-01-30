import { getFavouriteGames, getFavouritesIds, getGame } from '../index'
import gameMock from '../../__mocks__/game'
import entities, { actionNames, fetchEntity } from '../entities'

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
      expect(getFavouriteGames(state)).toEqual([{ ...gameMock, isFavourite: true }])
    })
  })

  describe('getGame', () => {
    it('should return the game entities with a concrete ID', () => {
      expect(getGame(state, 1)).toEqual(gameMock)
    })
  })
})

describe('reducers', () => {
  describe('entities', () => {
    it('should provide the initial state', () => {
      expect(entities(undefined, {})).toEqual({
        games: []
      })
    })

    describe('when a normalized response is received', () => {
      const response = {
        result: [1],
        entities: {
          games: {
            1: gameMock
          }
        }
      }
      it('should handle ANY action with response as data', () => {
        expect(entities(undefined, {
          type: 'WHATEVER_ACTION',
          response
        })).toEqual(response.entities)
      })

      it('should overwrite the entity with the same ID', () => {
        const initialEntities = {
          games: {
            1: {}
          }
        }
        expect(entities(initialEntities, {
          type: 'WHATEVER_ACTION',
          response
        })).toEqual(response.entities)
      })

    })
  })
  describe('actionNames', () => {
    it('given a entity name, generate an array with each entity action type', () => {
      expect(actionNames('GAME')).toEqual(['GAME_REQUEST', 'GAME_SUCCESS', 'GAME_FAILURE'])
    })
  })

  describe('fetchEntity', () => {
    const response = {
      result: [1],
      entities: {
        games: {
          1: gameMock
        }
      }
    }
    const actionTypes = {
      REQUEST: {
        type: 'GAME_REQUEST'
      },
      FAILURE: {
        type: 'GAME_FAILURE',
      },
      SUCCESS: {
        type: 'GAME_SUCCESS',
        response
      }
    }
    Object.keys(actionTypes).forEach(
      actionType => {
        describe(`for *_${actionType} type`, () => {
          const action = actionTypes[actionType]
          it('should provide the initial state', () => {
            expect(fetchEntity('GAME')(undefined, action)).toMatchSnapshot()
          })
        })
      }
    )
  })
})
