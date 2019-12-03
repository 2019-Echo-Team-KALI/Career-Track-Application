import React from "react"
import PropTypes from "prop-types"
import HomePage from "./HomePage"
import CareerPage from './CareerPage'
import CreateJob from './CreateJob'
import ShowCurrentJob from './ShowCurrentJob'

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
                logged_in={logged_in}
                sign_in_route={sign_in_route}
                sign_out_route={sign_out_route}
                current_user_id={current_user_id}
            />

                {logged_in &&
                    <div>
                        <Switch>
                            <Route exact path="/careerpage">
                                <CareerPage
                                    current_user_id={current_user_id}
                                 />
                            </Route>

                            <Route exact path='/jobs/:id' component = {ShowCurrentJob} />


                            <Route exact path="/createjob">
                                <CreateJob />
                            </Route>
                        </Switch>
                    </div>
                }


          </React.Fragment>
      </Router>
    );

}

export default App
