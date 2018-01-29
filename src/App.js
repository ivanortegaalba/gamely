import React, { Component, Fragment } from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { H1, Header, theme } from './style/styled-components'
import GamesView from './containers/GamesView'

injectGlobal`
body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.baseFontFamily};
  }
`

const Icon = styled.img`
  border-radius: 50%;
`

class App extends Component {
  render () {
    return <ThemeProvider theme={theme}>
      <Fragment>
        <Header size={'l'}>
          <H1>Welcome to Gamely</H1>
          <Icon src={`${process.env.PUBLIC_URL}/face.jpg`} alt='logo' width='40' height='40' />
        </Header>
        <GamesView />
      </Fragment>
    </ThemeProvider>
  }
}

export default App
