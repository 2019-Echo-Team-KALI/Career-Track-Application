import React from "react"
import PropTypes from "prop-types"
import HomeCarousel from '../../components/home-carousel/HomeCarousel.js'
import AboutUs from '../../components/about-us/AboutUs.js'


function HomePage() {
    return (
      <React.Fragment>

        <HomeCarousel />
        <AboutUs />
      </React.Fragment>
    );
}

export default HomePage
