import React from 'react'

import { Link } from 'components/Link'
import Layout from 'components/Layout'
import Image from 'components/Image'
import SEO from 'components/SEO'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import ChatList from '../components/ChatList'
import Typography from '@material-ui/core/Typography'

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
