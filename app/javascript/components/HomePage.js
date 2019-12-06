import React from "react"
import PropTypes from "prop-types"
import lisa from './lisakamino.jpg'
import kalvin from './kalvinkang.jpg'
import ian from './ianthompson.jpg'
import arvin from './arvinlleva.jpg'
import github from './github.png'
import linkedin from './linkedin.png'

function HomePage() {
    return (
      <React.Fragment>
        <div>
            <h1>Welcome to Career Track!</h1>
        </div>

        <div className = "aboutus">
          <h2>About Us</h2>
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

export default HomePage
