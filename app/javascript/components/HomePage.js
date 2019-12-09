import React from "react"
import PropTypes from "prop-types"
import HomeCarousel from './HomeCarousel.js'
import AboutUs from './AboutUs.js'

function HomePage() {
    return (
      <React.Fragment>
        <HomeCarousel />
        <AboutUs />
      </React.Fragment>
    );
}

export default HomePage
