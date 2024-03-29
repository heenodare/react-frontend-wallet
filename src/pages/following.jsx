import React from 'react'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import UserList from 'components/UserList'

const FollowPage = () => (
  <Layout>
    <SEO title="Following" />
    <UserList />
  </Layout>
)

export default FollowPage
