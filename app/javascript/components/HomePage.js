import React from "react"
import PropTypes from "prop-types"

function HomePage() {
    return (
      <React.Fragment>
        <div style = {{backgroundColor: 'red'}}>
            <h1>Home page for users that are not logged in</h1>
        </div>
      </React.Fragment>
    );
}

export default HomePage
