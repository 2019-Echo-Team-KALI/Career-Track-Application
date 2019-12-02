import React from "react"
import PropTypes from "prop-types"
import HomePage from "./HomePage"
import Header from "./pages/Header"
import { BrowserRouter as Router, Link } from "react-router-dom"

function App(props) {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      current_user_id
    } = props

    return (
        <Router>
          <React.Fragment>
            <Header />
            <h1><Link to="/">Career Track </Link></h1>
            {" "}
            {logged_in &&
              <div>
                <a href={sign_out_route}>Sign Out</a>
              </div>
            }
            {!logged_in &&
              <div>
                <a href={sign_in_route}>Sign In</a>
              </div>
            }
          </React.Fragment>
      </Router>
    );

}

export default App

// logged_in={logged_in} sign_in_route={sign_in_route} sign_out_route={sign_out_route}
// current_user_id={current_user_id}
