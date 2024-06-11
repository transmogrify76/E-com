import React from 'react'
import Dashboard from '../../Components/Dashboard/Dashboard'
import Popular from '../../Components/Popular/Popular'
import Offers from '../Offers/Offers'
import NewCollections from '../NewCollections/NewCollections'

const Shop = () => {
  return (
    <div>
       <Dashboard/>
       <Popular />
       <Offers />
       <NewCollections/>
    </div>
  )
}

export default Shop
