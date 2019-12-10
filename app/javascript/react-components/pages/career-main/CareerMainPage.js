import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import MainTaskList from '../../components/MainTaskList'
import "bootswatch/dist/lux/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Accordion, Card, Button, Navbar, Nav  } from 'react-bootstrap'
import google_logo from './google_logo.png'
import facebook_logo from './facebook_logo.png'
import { useState, useEffect } from 'react'


function CareerMainPage(props) {

    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData} = props

    const [ logo, setLogo ] = useState({
      google: google_logo,
      facebook: facebook_logo
    })

    useEffect(() => { // we need lifecycle hook here to reload the data whenever we create a page, we may need to rename the load functions to make things easier
        // the load functions set the data
        loadJobs()
        loadTasks()
    },[])


    const displayJobs = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj


                return(
                    <div key={index} >
                        <Link to={`/jobs/${id}`}>
                            <div style = {{borderStyle: 'inset'}}>
                                <h1> Name: {name} - Title: {title}</h1>
                            </div>
                        </Link>



                    </div>
                )

    })

    const displayJobs2 = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj


                return(

                      <div className="card mb-3" style= {{width: '18%', display: 'inline-block', marginLeft: '2em'}} key={index}>
                        <a href={`/jobs/${id}`} >
                          <h3 className="card-header">{name}</h3>
                        </a>
                        <div className="card-body">
                          <h5 className="card-title">{title}</h5>
                          <h6 className="card-subtitle text-muted">{url}</h6>
                        </div>
                        {/*<img style={{height: '200px', width: '100%', display: 'block'}}  alt="Card image" src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"/> */}
                        <div className="card-body">
                          <p className="card-text">{description}</p>
                        </div>

                        <Accordion defaultActiveKey="0">
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Task #1
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body>Information on task 1</Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          <Card>

                            <Card.Header>
                              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                Task #2
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                              <Card.Body>Information on Task 2</Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>

                        </div>
                )
    })



    return (
      <React.Fragment>
          <div style={{borderStyle: 'edge', marginLeft: '18em'}}>
          {/*<MainTaskList
              apiTasksData={apiTasksData}
              apiJobsData={apiJobsData}
              current_user_id={current_user_id}
          />*/}
          <br />

          <ul className="nav nav-tabs" style={{marginLeft: '28em'}}>
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " data-toggle="tab" href="#applied">Applied</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#wishList">Wish List</a>
            </li>

          </ul>



          <div id="myTabContent" className="tab-content">
            <div id="applied">
              <div className="jumbotron">
                <h1 className="display-3">Applied</h1>
                <p className="lead"> You have applied to these jobs</p>
                <hr className="my-4" />
                {displayJobs2}
              </div>
            </div>
          </div>

          <div id="myTabContent" className="tab-content">
            <div id='wishList'>
              <div className="jumbotron">
                <h1 className="display-3">Wish List</h1>
                <p className="lead"> This is your wish list for jobs</p>
                <hr className="my-4" />
                {displayJobs2}
              </div>
            </div>
          </div>

          <br></br>
          <br></br>
          </div>
      </React.Fragment>
    );

}

export default CareerMainPage
