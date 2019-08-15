import React from 'react'
import GeneralLayout from 'components/GeneralLayout'
import SEO from 'components/SEO'
import Profile from 'components/Profile'

const ProfilePage = () => (
  <GeneralLayout>
    <SEO title="Profile" />
    <Profile />
  </GeneralLayout>
)

export default ProfilePage
