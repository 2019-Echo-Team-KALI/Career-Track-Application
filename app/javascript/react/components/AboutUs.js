import React from "react"
import PropTypes from "prop-types"
import lisa from '../images/lisakamino.jpg'
import kalvin from '../images/kalvinkang.jpg'
import ian from '../images/ianthompson.jpg'
import arvin from '../images/arvinlleva.jpg'
import github from '../images/github.png'
import linkedin from '../images/linkedin.png'

function AboutUs() {
    return (
      <React.Fragment>
        <div className = "aboutus">
          <h4>Meet the Devs</h4>
            <div className="bio">
              <img src={arvin} className="biophoto"/>
              <p>Arvin Lleva</p>
              <div className="logo">
                <a href = "https://github.com/adclleva" target="_blank"><img src={github} /></a>
                <a href = "https://www.linkedin.com/in/arvinlleva/" target="_blank"><img src={linkedin} /></a>
              </div>
            </div>

              <div className="bio">
                <img src={ian} className="biophoto"/>
                <p>Ian Thompson</p>
                <div className="logo">
                  <a href="https://github.com/thompsian" target="_blank"><img src={github} /></a>
                  <a href= "https://www.linkedin.com/in/thompsian/" target="_blank"><img src={linkedin} /></a>
                </div>
              </div>

              <div className="bio">
                <img src={kalvin} className="biophoto"/>
                <p>Kalvin Kang</p>
                <div className="logo">
                  <a href="https://github.com/kalvin-k" target="_blank"><img src={github} /></a>
                  <a href="https://www.linkedin.com/in/kalvin-k/" target="_blank"><img src={linkedin} /></a>
                </div>
              </div>

              <div className="bio">
                <img src={lisa} className="biophoto"/>
                <p>Lisa Kamino</p>
                <div className="logo">
                  <a href="https://github.com/lk15" target="_blank"><img src={github} /></a>
                  <a href="https://www.linkedin.com/in/lisakamino/" target="_blank"><img src={linkedin} /></a>
                </div>
              </div>

        </div>
      </React.Fragment>
    );
}

export default AboutUs
