import React from 'react'
import PropTypes from '../PropTypes'
import { FlexGrid, Grid } from '../style/styled-components/objects/Grid'
import { Flex } from '../style/styled-components/objects/Flex'
import Game from './Game'

// TODO: Create style-component List
export function GameList ({ games, open, addToFavourites, removeFromFavourites }) {
  const Wrapper = open ? Grid : FlexGrid
  return <Wrapper>
    {games.map((game, idx) => <Flex key={idx}>
      <Game
        game={game}
        addToFavourites={addToFavourites }
        removeFromFavourites={removeFromFavourites}
      />
    </Flex>)}
  </Wrapper>
}

GameList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.game)
}
GameList.defaultProps = {
  open: false,
  games: []
}

export default GameList
