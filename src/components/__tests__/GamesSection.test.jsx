import React from 'react'
import mockGame from '../../__mocks__/game'
import { shallowWithTheme } from '../../testUtils'
import { theme } from '../../style/styled-components/theme'
import { GamesSection } from '../GamesSection'
import { GameList } from '../GameList'

describe('<GamesSection />', () => {
  describe('init', () => {
    const removeFromFavourites = jest.fn()
    const addToFavourites = jest.fn()
    const component = (
      <GamesSection
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
      />
    )
    const wrapper = shallowWithTheme(component, theme)
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should change the state when the show more button is clicked', () => {
      expect(wrapper.state()).toEqual({ 'open': false })
      wrapper.find({ dataSpec: 'see-more-button' }).simulate('click')
      expect(wrapper.state()).toEqual({ 'open': true })
    })
  })

  describe('has many games', () => {
    const removeFromFavourites = jest.fn()
    const addToFavourites = jest.fn()
    const games = [{ ...mockGame, isFavourite: true }, { ...mockGame }]
    const component = (
      <GamesSection
        games={games}
        removeFromFavourites={removeFromFavourites}
        addToFavourites={addToFavourites} />)
    const wrapper = shallowWithTheme(component, theme)
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should pass the games to GameList correctly', () => {
      expect(wrapper.find('GameList').props()['games']).toEqual(games)
    })
    it('should filter games before to pass them to GameList', () => {
      const filterGamesStartWith = 'a'
      const expectedGame = { ...mockGame, name: 'a' }
      const games = [expectedGame, { ...mockGame, name: 'b' }]
      wrapper.setProps({ filterGamesStartWith, games })
      wrapper.update()
      expect(wrapper.find('GameList').props()['games']).toEqual([expectedGame])
    })
  })
})
