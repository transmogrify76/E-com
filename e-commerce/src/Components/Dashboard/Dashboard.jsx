import React from 'react'
import './Dashboard.css'
// import hand_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/hand_icon.png'
import arrow_icon from '../Assests/Ecommerce_Frontend_Assets/Assets/arrow.png'
import hero_icon from '../Assests/hero.jpg.png'
import Popular from '../Popular/Popular'
import Offers from '../Offers/Offers'
import NewCollections from '../NewCollections/NewCollections'


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



{/*Sujata add */}

<div className="hero-latest-version">
<a href="https://www.amazon.com/s?k=amazon%27s+best+deals&rh=n%3A172282&dc&ds=v1%3AIGtsgiuc5D1cseZkYv5tzwp7TjnYdyZ%2BEMZ4AgQ4ysk&adgrpid=1335909030422677&hvadid=83494578236543&hvbmt=bb&hvdev=c&hvlocphy=156412&hvnetw=o&hvqmt=b&hvtargid=kwd-83495365302756&hydadcr=7690_13466622&msclkid=dd11b5dbfe0e1e8d6eeed368e0b75993&qid=1723014846&rnid=2941120011&tag=mh0b-20&ref=sr_nr_n_4" className='latestcollection'>
<button className='latestcollection'>Latest collection
</button>
    </a>
  <img src={arrow_icon} alt="" />
</div>

{/*end here*/ }


</div>
<div className="hero-right">
  <img src={hero_icon} alt="" />
</div>

</div>
<Popular />
<Offers />
<NewCollections/>
</div>

  )
}

export default Dashboard
