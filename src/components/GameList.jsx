import React from 'react';
import PropTypes from '../PropTypes';
import { FlexGrid, Grid } from '../style/styled-components/objects/Grid';
import Game from './Game';

// TODO: Create style-component List
export function GameList({
  games,
  open,
  addToFavourites,
  removeFromFavourites,
}) {
  const Wrapper = open ? Grid : FlexGrid;

  return (
    <Wrapper>
      {games.map((game, idx) => (
        <Game
          key={idx}
          game={game}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
        />
      ))}
    </Wrapper>
  );
}

GameList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.game),
};
GameList.defaultProps = {
  open: false,
  games: [],
};

export default GameList;
