import React from 'react'
import { shallowWithStore } from '../../testUtils'
import MainView from '../MainView'
import { createMockStore } from 'redux-test-utils'

// TODO: Test the component without connect
// TODO: Test the componentDidMount lifecycle
describe('<MainView />', () => {
  describe('init', () => {
    const store = createMockStore({
      entities: {},
      favourites: [],
      games: [],
      filterBy: ''
    })
    const component = <MainView />
    const wrapper = shallowWithStore(component, store)
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should pass connect the necessary props', () => {
      expect(wrapper.props()).toMatchSnapshot()
    })
  })
})
