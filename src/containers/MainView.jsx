import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from '../PropTypes'
import styled from 'styled-components'
import { Header, px2rems } from '../style/styled-components'
import { palette, key } from '../style/styled-components/tools/functions'
import { dispatchers } from '../actions'
import { selectors } from '../reducers'
import { GamesSection } from '../components'

// TODO: Move this component to the styled-components library
const InputHeader = styled.input`
  border: 1px solid ${palette(0)};
  color: white;
  text-decoration-color: white;
  padding: ${px2rems(15)};
  width: 50%;
  font-size: ${key('fontSizes.s')}px;
  background-color: ${palette(2)};
  text-align: center;
  font-size: ${props => props.theme};
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  ::placeholder { 
    color: ${key('palette.white')};
    opacity: 1; /* Firefox */
}
`

class MainView extends Component {
  componentDidMount () {
    this.props.fetchGames()
  }

  onSearchChange = (event) => {
    this.props.filterGameBy(event.target.value)
  }

  render () {
    const { games, favourites, filterBy, ...others } = this.props
    return <Fragment>
      <section id='search'>
        <Header palette={'dark'}>
          <InputHeader
            palette={'dark'}
            type='text'
            placeholder={'Search game...'}
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

MainView.propTypes = {
  games: PropTypes.arrayOf(PropTypes.game).isRequired,
  fetchGames: PropTypes.func.isRequired,
  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  games: selectors.getAllGames(state),
  favourites: selectors.getFavouriteGames(state),
  filterBy: selectors.getFilterBy(state)
})

const { addToFavourites, removeFromFavourites, fetchGames, filterGameBy } = dispatchers
export default connect(
  mapStateToProps,
  {
    addToFavourites,
    removeFromFavourites,
    fetchGames,
    filterGameBy
  }
)(MainView)
