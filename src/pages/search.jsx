import React from 'react'
import GeneralLayout from 'components/GeneralLayout'
import SEO from 'components/SEO'
import Search from 'components/Search'

function SearchPage() {
  return (
    <GeneralLayout>
      <SEO title="Search" />
      <Search />
    </GeneralLayout>
  )
}

export default SearchPage
