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
                  <a className="navbar-brand" href="/"><b>KALI</b></a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <a className="nav-link" href="careermainpage">Listings <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href='createjob'>Create Job Listing</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="homepage">About Us</a>
                      </li>

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

/*logged_in &&
    <div>
        <h1><Link to="/careermainpage">Career Page </Link></h1>

        <h1><Link to="/createjob">Create a new job </Link></h1>
    </div>



logged_in &&
  <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">Home</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href='/careermainpage'>Listings <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/createjob">Create Job Listing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/homepage">About us</a>
        </li>

      </ul>
    </div>
  </nav>
  </div>
*/
