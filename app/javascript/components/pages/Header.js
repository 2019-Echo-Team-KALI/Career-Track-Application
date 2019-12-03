import React from "react"
import { Link } from "react-router-dom"
import { Nav, NavItem, NavLink } from 'reactstrap'

function Header(props) {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      current_user_id
    } = props

    return (
        <React.Fragment>
            <Nav>
                <NavItem><Link to="/">Career Track </Link></NavItem>

                {logged_in &&
                    <NavItem>
                        <Link to="/careerpage">Career Page </Link>
                        <Link to="/createjob">Create a new job </Link>
                    </NavItem>

                }
                {" "}
                {logged_in &&
                  <NavItem>
                    <a href={sign_out_route}>Sign Out</a>
                  </NavItem>
                }
                {!logged_in &&
                  <NavItem>
                    <a href={sign_in_route}>Sign In</a>
                  </NavItem>
                }
            </Nav>

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Link class="navbar-brand" to='/'>Home</Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <Link class="nav-link" to='/careerpage'>Career Page <span class="sr-only">(current)</span></Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" href="#">Features</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" href="#">Pricing</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</Link>
                  </li>
                </ul>
              </div>
            </nav>
        </React.Fragment>

    )
}

export default Header
