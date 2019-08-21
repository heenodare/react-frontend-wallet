import React from 'react'
import GeneralLayout from 'components/GeneralLayout'
import SEO from 'components/SEO'
import Branches from 'components/Branches'

function BranchesPage() {
  return (
    <GeneralLayout>
      <SEO title="Branches" />
      <Branches />
    </GeneralLayout>
  )
}

export default BranchesPage
