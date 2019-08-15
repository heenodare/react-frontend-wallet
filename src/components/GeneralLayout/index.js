import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, theme } from 'util/style'
import GlobalStyles from 'util/style/GlobalStyles'

import GeneralHeader from 'components/GeneralHeader'
import config from '../../../config/meta'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <GeneralHeader siteTitle={config.siteTitle || config.siteTitleAlt} />
      {children}
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
