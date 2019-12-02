import React from "react"
import PropTypes from "prop-types"
import HomePage from "./HomePage"
import HomePageDupe from "./HomePageDupe"
import CareerPage from './CareerPage'

import Header from "./pages/Header"
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"

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
            <Header
                logged_in={logged_in} sign_in_route={sign_in_route} sign_out_route={sign_out_route}
                current_user_id={current_user_id}
            />
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/homepagedupe">
                    <HomePageDupe />
                </Route>
                <Route exact path="/careerpage">
                    <CareerPage />
                </Route>
            </Switch>

          </React.Fragment>
      </Router>
    );

}

export default App
