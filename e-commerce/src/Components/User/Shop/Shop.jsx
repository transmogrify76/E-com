import React from 'react'
import Dashboard from '../../Universal/Dashboard/Dashboard'
import Popular from '../../User/Popular/Popular'
import Offers from '../Offers/Offers'
import NewCollections from '../../User/NewCollections/NewCollections'

const Shop = () => {
  return (
    <div>
      <Dashboard />
      <Popular />
      <Offers />
      <NewCollections />
    </div>
  )
}

export default Shop
