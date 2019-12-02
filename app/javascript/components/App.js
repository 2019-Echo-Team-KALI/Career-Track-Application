import React from "react"
import PropTypes from "prop-types"
import HomePage from "./HomePage"
import CareerPage from './CareerPage'
import CreateJob from './CreateJob'

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
            <Switch>
                {!logged_in &&
                    <Route path="/">
                        <HomePage />
                    </Route>
                }
            </Switch>

            <Header
                logged_in={logged_in} sign_in_route={sign_in_route} sign_out_route={sign_out_route}
                current_user_id={current_user_id}
            />

            <Switch>
                {logged_in &&
                    <div>
                        <Route exact path="/careerpage">
                            <CareerPage />
                        </Route>

                        <Route exact path="/createjob">
                            <CreateJob />
                        </Route>
                    </div>
                }
            </Switch>

          </React.Fragment>
      </Router>
    );

}

export default App
