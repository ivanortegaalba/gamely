import React, { Component } from 'react'
import PropTypes from '../PropTypes'
import { Button, Header } from '../style/styled-components'
import GameList from './GameList'

export class GamesSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.defaultOpen | false
    }
  }

  onClickSeeMore = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { title, games, filterGamesStartWith, ...others } = this.props
    const filteredGames = filterGamesStartWith
      ? games.filter(game => game.name.toLowerCase().startsWith(filterGamesStartWith.toLowerCase()))
      : [...games]

    return (
      <section>
      <Header palette={'light'}>
        <h1>{title}</h1>
      </Header>
      <Button margin={'5px 20px 0'} onClick={this.onClickSeeMore} style={{ float: 'right' }}>
        {this.state.open ? 'Show less' : 'Show all'}
      </Button>
      <GameList open={this.state.open} games={filteredGames} {...others} />
    </section>
    )
  }

}

PropTypes.propTypes = {
  games: PropTypes.arrayOf(PropTypes.game).isRequired,
  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  defaultOpen: PropTypes.bool,
  filterGamesStartWith: PropTypes.string
}
