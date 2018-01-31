import React from 'react';
import Game from '../Game';
import mockGame from '../../__mocks__/game';
import { shallowWithTheme } from '../../testUtils';
import { theme } from '../../style/styled-components/theme';

describe('<Game/>', () => {
  describe('represent a no favourite game', () => {
    const removeFromFavourites = jest.fn();
    const addToFavourites = jest.fn();
    const component = (
      <Game
        game={mockGame}
        removeFromFavourites={removeFromFavourites}
        addToFavourites={addToFavourites}
      />
    );
    const wrapper = shallowWithTheme(component, theme);
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should hide the remove button', () => {
      expect(wrapper.find({ dataSpec: 'remove-button' })).toHaveLength(0);
    });
    it('should call addToFavourites when the save button is clicked', () => {
      wrapper.find({ dataSpec: 'save-button' }).simulate('click');
      expect(addToFavourites).toHaveBeenCalledTimes(1);
      expect(removeFromFavourites).toHaveBeenCalledTimes(0);
      expect(addToFavourites).toHaveBeenCalledWith(mockGame.short);
    });
  });
  describe('represent a favourite game', () => {
    const removeFromFavourites = jest.fn();
    const addToFavourites = jest.fn();
    const component = (
      <Game
        game={{ ...mockGame, isFavourite: true }}
        removeFromFavourites={removeFromFavourites}
        addToFavourites={addToFavourites}
      />
    );
    const wrapper = shallowWithTheme(component, theme);
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should hide the remove button', () => {
      expect(wrapper.find({ dataSpec: 'save-button' })).toHaveLength(0);
    });
    it('should call removeFromFavourites when the remove button is clicked', () => {
      wrapper.find({ dataSpec: 'remove-button' }).simulate('click');
      expect(removeFromFavourites).toHaveBeenCalledTimes(1);
      expect(addToFavourites).toHaveBeenCalledTimes(0);
      expect(removeFromFavourites).toHaveBeenCalledWith(mockGame.short);
    });
  });
});
