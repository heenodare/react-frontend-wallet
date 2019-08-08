import React from 'react'

import Layout from 'components/Layout'
import SEO from 'components/SEO'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import ChatList from '../components/ChatList'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CssBaseline />
    <Container maxWidth="lg">
      <ChatList />
    </Container>
  </Layout>
)

export default IndexPage
