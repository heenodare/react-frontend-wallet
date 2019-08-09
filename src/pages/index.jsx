import React from 'react'

import Layout from 'components/Layout'
import SEO from 'components/SEO'
import CssBaseline from '@material-ui/core/CssBaseline'
import Discover from '../components/Discover'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CssBaseline />
    <Discover />
  </Layout>
)

export default IndexPage
