import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { addToFavourites, fetchGames, removeFromFavourites } from '../actions'
import PropTypes from '../PropTypes'
import * as selectors from '../reducers'
import { connect } from 'react-redux'
import { GamesSection } from '../components/GamesSection'
import { Header } from '../style/styled-components'
import { palette } from 'styled-theme'
import { filterGameBy } from '../actions/dispatchers'

const Input = styled.input`
  border: 1px solid ${palette(0)};
  color: white;
  text-decoration-color: white;
  padding: 15px;
  width: 100%;
  background-color: ${palette(2)};
  text-align: center;
`

class GamesContainer extends Component {
  componentDidMount () {
    this.props.fetchGames()
  }

  onSearchChange = (event) => {
    debugger
    this.props.filterGameBy(event.target.value)
  }

  render () {
    const { games, favourites, filterBy, ...others } = this.props

    return <Fragment>
      <section id='search'>
        <Header palette={'blue'} size={'l'}>
          <Input palette={'primary'} type='text' placeholder={'Search game...'}
                 onChange={this.onSearchChange} />
        </Header>
      </section>
      {favourites.length > 0 &&
      <GamesSection title='Recently Saved' games={favourites} {...others}
                    filterGamesStartWith={filterBy} />}
      {games.length > 0 &&
      <GamesSection title='Explore' games={games} {...others} filterGamesStartWith={filterBy}
                    defaultOpen />}
    </Fragment>
  }
}

GamesContainer.propTypes = {
  games: PropTypes.arrayOf(PropTypes.game).isRequired,
  fetchGames: PropTypes.func.isRequired,
  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  games: selectors.getAllGames(state),
  favourites: selectors.getFavouriteGames(state),
  filterBy: selectors.getFilterBy(state)
})

export default connect(
  mapStateToProps,
  {
    addToFavourites,
    removeFromFavourites,
    fetchGames,
    filterGameBy
  }
)(GamesContainer)
