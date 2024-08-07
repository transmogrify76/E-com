import React from 'react'
import './Dashboard.css'
import arrow_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/arrow.png'
import hero_icon from '../../Assests/hero.jpg.png'
import Popular from '../../User/Popular/Popular'
import Offers from '../../User/Offers/Offers'
import NewCollections from '../../User/NewCollections/NewCollections'

const Dashboard = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-left">
          <h2>New Arrivals Only</h2>
          <br></br><br></br>
          <div className="hand-hand-icon">
            <p>New <br></br>Collections <br></br>
              for everyone</p>
          </div>
          <div className="hero-latest-version">
            <button className='latestcollection'>Latest collection
            </button>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_icon} alt="" />
        </div>

      </div>
      <Popular />
      <Offers />
      <NewCollections />
    </div>

  )
}

export default Dashboard
