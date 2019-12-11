import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import arvin from '../images/arvinlleva.jpg'
import ProfileCard from '../components/ProfileCard'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import google_logo from '../images/google_logo.png'
import facebook_logo from '../images/facebook_logo.png'
import { useState, useEffect } from 'react'


function CareerMainPage(props) {

    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData, getTask } = props


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
                        <div className="card mb-3" style= {{width: '22%', display: 'inline-block', marginLeft: '1em', marginRight: '1em'}} key={index}>

                        <Card>
                          <Card.Body>
                            <Card.Title><a href={`/jobs/${id}`}><b>{name}</b></a></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
                            <Card.Text>
                              {description}
                            </Card.Text>
                            <Card.Footer>
                              <small className="text-muted" style={{borderStyle: 'edge'}}>{url}</small>
                            </Card.Footer>
                          </Card.Body>
                        </Card>



                        </div>
                )
    })


    const displayTask = [...apiTasksData].reverse().map((taskObj, index) => {
      const { description } = taskObj

      return(
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Task:
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="{1}">
            <Card.Body>{description}</Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    })


    return (
      <React.Fragment>
          <div style={{borderStyle: 'edge', width: '80%', float: 'right', marginTop: '1em'}}>
          {/* Next is to mob the maintasklist
              <MainTaskList

                  apiTasksData={apiTasksData}
                  apiJobsData={apiJobsData}
                  current_user_id={current_user_id}
                  />

              <br />

              */}




          <Nav fill variant="tabs" defaultActiveKey="#applied" style={{border: '1px solid rgba(0, 0, 0, .2)', marginRight: '1.7em', marginTop: '1.7em' }}>
            <Nav.Item>
              <Nav.Link href="#applied">Applied</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#wishList'>Wish List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#moreInfo'>Get More Info</Nav.Link>
            </Nav.Item>

          </Nav>


          <div style={{display: 'inline-block', marginRight: '1.7em', width: '98.3%'}}>

              <div className='jumbotron'>
                <h1 className="display-3" style = {{marginTop: '-0.6em'}}>Applied</h1>
                <p className="lead"> You have applied to these jobs</p>
                <hr className="my-4" />
                {displayJobs2}
              </div>



              <div className="jumbotron">
                <h1 className="display-3" style = {{marginTop: '-0.6em'}}>Wish List</h1>
                <p className="lead"> This is your wish list for jobs</p>
                <hr className="my-4" />
                {displayJobs2}
              </div>

              <div className="jumbotron">
                <h1 className="display-3" style = {{marginTop: '-0.6em'}}>Get More Information</h1>
                <p className="lead">Look up more information on these companies to do well on the interview </p>
                <hr className="my-4" />
                {displayJobs2}
              </div>



          </div>


          <br></br>
          <br></br>

          </div>

          <ProfileCard
            current_user_id={current_user_id}
            loadJobs = {loadJobs}
            loadTasks = {loadTasks}
            apiJobsData={apiJobsData}
            apiTasksData={apiTasksData}
            getTask = {getTask}
          />

      </React.Fragment>
    );

}

export default CareerMainPage
