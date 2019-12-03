import React from "react"
import PropTypes from "prop-types"
import CareerMainPage from './CareerMainPage'
import CreateJob from './pages/jobs/CreateJob'
import ShowCurrentJob from './pages/jobs/ShowCurrentJob'

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
                logged_in={logged_in}
                sign_in_route={sign_in_route}
                sign_out_route={sign_out_route}
                current_user_id={current_user_id}
            />

                {logged_in &&
                    <div>
                        <Switch>
                            <Route exact path="/careermainpage">
                                <CareerMainPage
                                    current_user_id={current_user_id}
                                 />
                            </Route>

                            <Route exact path='/jobs/:id' >
                                <ShowCurrentJob />
                            </Route>


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
