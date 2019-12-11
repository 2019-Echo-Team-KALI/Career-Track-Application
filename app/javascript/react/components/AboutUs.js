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
          <h2>Meet the Devs</h2>
            <div className = "firstbios">
              <div className="bio">
                <img src={arvin} className="biophoto"/>
                <p>Arvin Lleva<br />
                Full-Stack Web Developer</p>
                <div className="logo">
                  <a href = "https://github.com/adclleva"><img src={github} /></a>
                  <a href = "https://www.linkedin.com/in/arvinlleva/"><img src={linkedin} /></a>
                </div>
              </div>
              <div className="bio">
                <img src={ian} className="biophoto"/>
                <p>Ian Thompson<br />
                Full-Stack Web Developer</p>
                <div className="logo">
                  <a href="https://github.com/thompsian"><img src={github} /></a>
                  <a href= "https://www.linkedin.com/in/thompsian/"><img src={linkedin} /></a>
                </div>
              </div>
            </div>
            <div className="secondbios">
              <div className="bio">
                <img src={kalvin} className="biophoto"/>
                <p>Kalvin Kang<br />
                Full-Stack Web Developer</p>
                <div className="logo">
                  <a href="https://github.com/kalvin-k"><img src={github} /></a>
                  <a href="https://www.linkedin.com/in/kalvin-k/"><img src={linkedin} /></a>
                </div>
              </div>
              <div className="bio">
                <img src={lisa} className="biophoto"/>
                <p>Lisa Kamino<br />
                Full-Stack Web Developer</p>
                <div className="logo">
                  <a href="https://github.com/lk15"><img src={github} /></a>
                  <a href="https://www.linkedin.com/in/lisakamino/"><img src={linkedin} /></a>
                </div>
              </div>
            </div>
        </div>
      </React.Fragment>
    );
}

export default AboutUs