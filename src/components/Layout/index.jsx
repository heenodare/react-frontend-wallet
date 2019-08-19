import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, theme } from 'util/style'
import GlobalStyles from 'util/style/GlobalStyles'

import Header from 'components/Header'
import Footer from 'components/Footer'
import config from '../../../config/meta'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Header siteTitle={config.siteTitle || config.siteTitleAlt} />
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <Footer />
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
