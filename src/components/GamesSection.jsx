import React, { Component } from 'react'
import PropTypes from '../PropTypes'
import { Button, Header } from '../style/styled-components'
import GameList from './GameList'

const ButtonRight = Button.extend`
  float: right;
`

export class GamesSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.defaultOpen
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
        <ButtonRight
          dataSpec={'see-more-button'}
          onClick={this.onClickSeeMore}
          margin={'m'}
          marginBottom={'0'}>
          {this.state.open ? 'Show less' : 'Show all'}
        </ButtonRight>
        <GameList open={this.state.open} games={filteredGames} {...others} />
      </section>
    )
  }

}

GamesSection.propTypes = {
  title: PropTypes.string,
  games: PropTypes.arrayOf(PropTypes.game),
  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  defaultOpen: PropTypes.bool,
  filterGamesStartWith: PropTypes.string
}

GamesSection.defaultProps = {
  title: '',
  defaultOpen: false,
  games: [],
  filterGamesStartWith: ''
}
