import React from 'react'
import PropTypes from 'prop-types'
import GeneralHeader from 'components/GeneralHeader'
import config from '../../../config/meta'

const Layout = ({ children }) => (
  <>
    <GeneralHeader siteTitle={config.siteTitle || config.siteTitleAlt} />
    {children}
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
