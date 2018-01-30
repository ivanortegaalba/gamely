import React from 'react'
import PropTypes from '../PropTypes'
import { Button } from '../style/styled-components'
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
  const goToPlay = () => {window.open(getGameURL(game), '_blank')}
  return <article>
    <figure>
      <img src={getLogoUrl(game)} alt='The Pulpit Rock' width='60' height='60' />
      <figcaption>{game.name}</figcaption>
    </figure>
    <footer>
      {game.isFavourite ? <Button
          dataSpec={'remove-button'}
          palette={'danger'}
          size={'s'}
          onClick={onClickFavourite}
          margin={'0 xs 0 0'}
          reverse>
          Remove
        </Button>
        : <Button
          dataSpec={'save-button'}
          palette={'primary'}
          size={'s'}
          onClick={onClickFavourite}
          margin={'0 xs 0 0'}
        >
          Save
        </Button>}
      <Button
        dataSpec={'play-button'}
        size={'s'}
        margin={'0 0 0 xs'}
        onClick={goToPlay}
        reverse={true}>
        Play
      </Button>
    </footer>
  </article>
}

Game.propTypes = {
  game: PropTypes.game.isRequired,
  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired
}
Game.defaultProps = {}

export default Game
