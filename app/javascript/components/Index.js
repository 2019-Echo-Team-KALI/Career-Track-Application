import React from "react"
import PropTypes from "prop-types"

import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { ContextProvider } from "./react-components/context/Context"

function Index(props) {

    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      current_user_id
    } = props

    return (
        <ContextProvider>  
            <Router>
                <App logged_in={logged_in} sign_in_route={sign_in_route} sign_out_route={sign_out_route} current_user_id={current_user_id}/>
            </Router>
        </ContextProvider>  
    );

}

export default Index
