import React from "react"
import PropTypes from "prop-types"
import HomeCarousel from '../components/HomeCarousel.js'
import AboutUs from '../components/AboutUs.js'
import AboutApp from '../components/AboutApp.js'

function HomePage() {
    return (
      <React.Fragment>

        <HomeCarousel />
        <AboutApp />
        <AboutUs />
      </React.Fragment>
    );
}

export default HomePage
