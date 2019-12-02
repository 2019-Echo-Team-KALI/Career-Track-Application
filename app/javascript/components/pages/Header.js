import React from "react"
import { Link } from "react-router-dom"

function Header(props) {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      current_user_id
    } = props

    return (
        <React.Fragment>
            <nav>
                <h1><Link to="/">Career Track </Link></h1>

                {logged_in &&
                    <div>
                        <h1><Link to="/careerpage">Career Page </Link></h1>

                        <h1><Link to="/createjob">Create a new job </Link></h1>
                    </div>

                }
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
            </nav>
        </React.Fragment>

    )
}

export default Header
