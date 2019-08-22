import React from 'react'
import PropTypes from 'prop-types'
import ChatHeader from 'components/ChatHeader'
import ChatInput from 'components/ChatInput'
import config from '../../../config/meta'

const Layout = ({ children }) => (
  <>
    <ChatHeader siteTitle={config.siteTitle || config.siteTitleAlt} />
    <div style={{ minHeight: '100vh' }}>{children}</div>
    <ChatInput />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
