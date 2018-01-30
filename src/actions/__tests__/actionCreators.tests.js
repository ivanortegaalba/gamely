import { addToFavouritesUnsafe, fetchGames, filterGamesBy, removeFromFavouritesUnsafe
} from '../actionCreators'
import gameMock from '../../__mocks__/game'

describe('actionCreators', () => {
  describe('fetchGames', () => {
    it('should return a call api action', () => {
      expect(fetchGames()).toMatchSnapshot()
    })
  })

  describe('addToFavouritesUnsafe', () => {
    it('should return an action with a the game short name', () => {
      expect(addToFavouritesUnsafe(gameMock.short)).toMatchSnapshot()
    })
  })

  describe('removeFromFavouritesUnsafe', () => {
    it('should return an action with a the game short name', () => {
      expect(removeFromFavouritesUnsafe(gameMock.short)).toMatchSnapshot()
    })
  })

  describe('filterGamesBy', () => {
    it('should return an action with the value which will be used to filter', () => {
      expect(filterGamesBy(gameMock.name)).toMatchSnapshot()
    })
  })
})
