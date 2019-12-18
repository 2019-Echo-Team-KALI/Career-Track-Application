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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <Link to="/" className="navbar-brand"><b>CAREER TRACK</b></Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                    {logged_in &&
                      <li className="nav-item active">
                        <Link to="/maincareerpage" className="nav-link">Career Dashboard</Link> <span className="sr-only">(current)</span>
                      </li>
                    }
                    {logged_in &&
                      <li className="nav-item">
                        <Link to="/createjobpage/Wish List" className="nav-link">Add a job to track </Link>
                      </li>
                    }

                    {logged_in &&
                      <li className="nav-item">
                        <Link to="/homepage" className="nav-link">Meet the Devs</Link>
                      </li>
                    }
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                      {logged_in &&
                        <div>
                          <a className="nav-link" href={sign_out_route}><button className="btn btn-warning" type="submit">Sign Out</button></a>
                        </div>
                      }
                      {!logged_in &&
                        <div>
                          <a className="nav-link" href={sign_in_route}><button className="btn btn-warning" type="submit">Sign In</button></a>
                        </div>
                      }
                    </form>
                  </div>
            </nav>
          </nav>
        </React.Fragment>
  )
}

export default Header
