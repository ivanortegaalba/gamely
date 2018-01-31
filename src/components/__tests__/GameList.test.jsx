import React from 'react';
import mockGame from '../../__mocks__/game';
import { shallowWithTheme } from '../../testUtils';
import { theme } from '../../style/styled-components/theme';
import { GameList } from '../GameList';

describe('<GameList/>', () => {
  describe('is empty', () => {
    const removeFromFavourites = jest.fn();
    const addToFavourites = jest.fn();
    const component = (
      <GameList
        removeFromFavourites={removeFromFavourites}
        addToFavourites={addToFavourites}
      />
    );
    const wrapper = shallowWithTheme(component, theme);
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('has many games', () => {
    const removeFromFavourites = jest.fn();
    const addToFavourites = jest.fn();
    const component = (
      <GameList
        games={[{ ...mockGame, isFavourite: true }, { ...mockGame }]}
        removeFromFavourites={removeFromFavourites}
        addToFavourites={addToFavourites}
      />
    );
    const wrapper = shallowWithTheme(component, theme);
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render a Game component for each game in the list', () => {
      expect(wrapper.find('Game')).toHaveLength(2);
    });
    it('should pass correct props for each game', () => {
      expect(wrapper.find('Game')).toHaveLength(2);
    });
  });
});
