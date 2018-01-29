import React from 'react'
import PropTypes from '../PropTypes'
import { Button, H2, H3 } from '../style/styled-components'
import { GAME_LIBRARY_URL } from '../constants'

export function Game ({ game, addToFavourites, removeFromFavourites }) {
  const getLogoUrl = ({ short }) => `${GAME_LIBRARY_URL}/images/games/${short}/${short}_60x60.gif`
  const getGameURL = ({ url }) => `${GAME_LIBRARY_URL}${url}`
  const onClickFavourite = () => {
    if (!game.isFavourite) {
      addToFavourites(game.short)
    }
    else {
      removeFromFavourites(game.short)
    }
  }
  return <article>
    <figure>
      <img src={getLogoUrl(game)} alt='The Pulpit Rock' width='60' height='60' />
      <figcaption>{game.name}</figcaption>
    </figure>
    <footer>
      {game.isFavourite ? <Button
          palette={'danger'}
          size={'s'}
          onClick={onClickFavourite}
          margin={'0 3px'}
          reverse>
          Remove
        </Button>
        : <Button
          palette={'primary'}
          size={'s'}
          onClick={onClickFavourite}
          margin={'0 3px'}
        >
          Save
        </Button>}
      <a href={getGameURL(game)}>
        <Button size={'s'} margin={'0 3px'} reverse={true}>
          Play
        </Button>
      </a>
    </footer>
  </article>
}

Game.propTypes = {
  game: PropTypes.game.isRequired
}
Game.defaultProps = {}

export default Game
