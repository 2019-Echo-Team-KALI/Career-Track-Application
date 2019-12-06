import React from "react"
import PropTypes from "prop-types"
import lisa from './lisakamino.jpg'
import kalvin from './kalvinkang.jpg'
import ian from './ianthompson.jpg'
import arvin from './arvinlleva.jpg'

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
                <img src={arvin} />
                <p>Arvin Lleva<br />
                Full-Stack Web Developer</p>
              </div>
              <div className="bio">
                <img src={ian} />
                <p>Ian Thompson<br />
                Full-Stack Web Developer</p>
              </div>
            </div>
            <div className="secondbios">
              <div className="bio">
                <img src={kalvin} />
                <p>Kalvin Kang<br />
                Full-Stack Web Developer</p>
              </div>
              <div className="bio">
                <img src={lisa} />
                <p>Lisa Kamino<br />
                Full-Stack Web Developer</p>
              </div>
            </div>
        </div>
      </React.Fragment>
    );
}

export default HomePage
