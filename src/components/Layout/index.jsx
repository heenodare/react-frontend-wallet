import React from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Toolbar from '@material-ui/core/Toolbar'
import config from '../../../config/meta'

const Layout = ({ children }) => (
  <>
    <Header siteTitle={config.siteTitle || config.siteTitleAlt} />
    <Toolbar />
    <div style={{ minHeight: '100vh' }}>{children}</div>
    <Footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
