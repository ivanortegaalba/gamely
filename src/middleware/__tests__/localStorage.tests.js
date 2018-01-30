/* globals localStorage */

import localStorageMiddleware, { loadState, saveState, STORAGE_KEY } from '../localStorage'
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../../actions/ActionTypes'

// TODO: Remove fixed responses. Use snapshots testing.
// The test results explain how the middleware api works
describe('localStorage', () => {

  describe('loadState', () => {
    it('should returns the content saved with STORAGE_KEY', () => {
      const storageDataExample = { a: 'b' }
      localStorage.getItem.mockReturnValueOnce(JSON.stringify(storageDataExample))
      const serializedState = loadState()
      expect(serializedState).toEqual(storageDataExample)
    })
    it('should returns undefined when there is not content', () => {
      localStorage.getItem.mockReturnValueOnce(null)
      expect(loadState()).toBe(undefined)
    })
    it('should returns undefined for read errors', () => {
      localStorage.getItem.mockImplementationOnce(() => {
        throw Error('whatever')
      })
      expect(loadState()).toBe(undefined)
    })
  })

  describe('saveState', () => {
    it('should save the content received as param with the key STORAGE_KEY', () => {
      const newState = { a: 'other b' }
      const setItem = jest.fn()
      localStorage.setItem.mockImplementationOnce(setItem)
      saveState(newState)
      expect(setItem.mock.calls.length).toBe(1)
      expect(setItem.mock.calls[0]).toEqual(
        [STORAGE_KEY, JSON.stringify(newState)]
      )
    })
    it('should ignore write errors', () => {
      const newState = { a: 'other b' }
      const setItem = jest.fn()
      localStorage.setItem.mockImplementationOnce(setItem)
      saveState(newState)
      expect(setItem.mock.calls.length).toBe(1)
      expect(setItem.mock.calls[0]).toEqual(
        [STORAGE_KEY, JSON.stringify(newState)]
      )
    })
  })

  describe('middleware function', () => {
    describe('ADD_TO_FAVOURITES is dispatched', () => {
      const setItem = jest.fn()
      const next = jest.fn()
      it('should save the state when the action triggered is ADD_TO_FAVOURITES', () => {
        localStorage.setItem.mockImplementationOnce(setItem)
        localStorageMiddleware({})(next)({
          type: ADD_TO_FAVOURITES
        })
        expect(setItem.mock.calls.length).toBe(1)

      })
      it('should call the next with the triggered action', () => {
        expect(next.mock.calls.length).toBe(1)
      })
    })

    describe('ADD_TO_FAVOURITES is dispatched', () => {
      const setItem = jest.fn()
      const next = jest.fn()
      it('should save the state when the action triggered is REMOVE_FROM_FAVOURITES', () => {
        localStorage.setItem.mockImplementationOnce(setItem)
        localStorageMiddleware({})(next)({
          type: REMOVE_FROM_FAVOURITES
        })
        expect(setItem.mock.calls.length).toBe(1)

      })
      it('should call the next with the triggered action', () => {
        expect(next.mock.calls.length).toBe(1)
      })
    })

    describe('other action is dispatched', () => {
      const setItem = jest.fn()
      const next = jest.fn()
      it('should save the state only for ADD_TO_FAVOURITES and REMOVE_FROM_FAVOURITES', () => {
        localStorage.setItem.mockImplementationOnce(setItem)
        localStorageMiddleware({})(next)({
          type: 'WHATEVER_ACTION_TYPE'
        })
        expect(setItem.mock.calls.length).toBe(0)
      })
      it('should call the next with the triggered action', () => {
        expect(next.mock.calls.length).toBe(1)
      })
    })
  })
})
