import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, theme } from 'util/style'
import GlobalStyles from 'util/style/GlobalStyles'
import ChatHeader from 'components/ChatHeader'
import ChatInput from 'components/ChatInput'
import config from '../../../config/meta'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <ChatHeader siteTitle={config.siteTitle || config.siteTitleAlt} />
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <ChatInput />
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
