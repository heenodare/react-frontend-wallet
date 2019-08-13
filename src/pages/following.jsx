import React from 'react'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import UserList from 'components/UserList'

const SecondPage = () => (
  <Layout>
    <SEO title="Chat" />
    <UserList />
  </Layout>
)

export default SecondPage
