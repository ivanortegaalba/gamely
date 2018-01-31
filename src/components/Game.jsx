import React from 'react';
import styled from 'styled-components';
import PropTypes from '../PropTypes';
import { Button, px2rems } from '../style/styled-components';
import { GAME_LIBRARY_URL } from '../constants';

const FlexItem = styled.article`
  flex: 0 0 auto;
  padding-bottom: ${props => px2rems(props.theme.spacing['l'])};
  text-align: center;
`;

export function Game({ game, addToFavourites, removeFromFavourites }) {
  const getLogoUrl = ({ short }) =>
    `${GAME_LIBRARY_URL}/images/games/${short}/${short}_60x60.gif`;
  const onClickFavourite = () => {
    if (!game.isFavourite) {
      addToFavourites(game.short);
    } else {
      removeFromFavourites(game.short);
    }
  };
  const goToPlay = () => {
    window.open(`${GAME_LIBRARY_URL}${game.url}`, '_blank');
  };

  return (
    <FlexItem>
      <header>{game.name}</header>
      <figure>
        <img src={getLogoUrl(game)} alt={game.name} width="60" height="60" />
      </figure>
      <footer>
        {game.isFavourite ? (
          <Button
            dataSpec={'remove-button'}
            palette={'danger'}
            size={'s'}
            onClick={onClickFavourite}
            margin={'0 xs 0 0'}
            reverse
          >
            Remove
          </Button>
        ) : (
          <Button
            dataSpec={'save-button'}
            palette={'primary'}
            size={'s'}
            onClick={onClickFavourite}
            margin={'0 xs 0 0'}
          >
            Save
          </Button>
        )}
        <Button
          dataSpec={'play-button'}
          size={'s'}
          margin={'0 0 0 xs'}
          onClick={goToPlay}
          reverse={true}
        >
          Play
        </Button>
      </footer>
    </FlexItem>
  );
}

Game.propTypes = {
  game: PropTypes.game.isRequired,
  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
};
Game.defaultProps = {};

export default Game;
