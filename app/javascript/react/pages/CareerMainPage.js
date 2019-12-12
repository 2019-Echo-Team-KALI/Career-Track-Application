import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import arvin from '../images/arvinlleva.jpg'
import ProfileCard from '../components/ProfileCard'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import google_logo from '../images/google_logo.png'
import facebook_logo from '../images/facebook_logo.png'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';

function CareerMainPage(props) {

    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData, getTask } = props

    const [ category, setCategory ] = useState([
      {
        title: 'Applied', 
        description: 'You have applied to these jobs',
        id: 1
      }, 
      {
        title: 'Wish List', 
        description: 'Your Wish List of jobs',
        id: 2
      }, 
      {
        title: 'Get More Information', 
        description: 'Look up more info on these Companies',
        id: 3
      }
    ])

    useEffect(() => { // we need lifecycle hook here to reload the data whenever we create a page, we may need to rename the load functions to make things easier
        // the load functions set the data
        loadJobs()
        loadTasks()
    },[])


    const displayJobs2 = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj

        return(
          <div className="card mb-3" style= {{width: '22%', display: 'inline-block', marginLeft: '1em', marginRight: '1em', position: 'aboslute', zIndex: 1}} key={index}>

            <Card style={{zIndex: 1}}>
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

    const displayCategory = category.map((categoryObj, index) => {

      const { title, description, id } = categoryObj 

      return (

          <div className='jumbotron' id = {id} key = {index}>
            <h1 className="display-3" style = {{marginTop: '-0.6em'}}>{title}</h1>
            <p className="lead">{description}</p>
            <hr className="my-4" />
            {displayJobs2}
          </div>

      )
    })

    return (
      <React.Fragment>
          <div style={{borderStyle: 'edge', width: '80%', float: 'right', marginTop: '1em'}}>

          <div style={{marginBottom: '2em' }}> 
            <Sticky>
              <Nav  fill variant="tabs" defaultActiveKey="#1" style={{border: '1px solid rgba(0, 0, 0, .2)',position: 'aboslute', marginRight: '1.7em', zIndex: 2}}>
                <Nav.Item>
                  <Nav.Link href="#1">   Applied   </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='#2'>Wish List</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='#3'>Get More Info</Nav.Link>
                </Nav.Item>
              </Nav>
            </Sticky>
          </div>

          <div style={{display: 'inline-block', marginRight: '1.7em', width: '98.3%'}}>
            {displayCategory}
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

    // const displayTask = [...apiTasksData].reverse().map((taskObj, index) => {
    //   const { description } = taskObj
    //
    //   return(
    //     <Card>
    //       <Card.Header>
    //         <Accordion.Toggle as={Card.Header} eventKey="1">
    //           Task:
    //         </Accordion.Toggle>
    //       </Card.Header>
    //       <Accordion.Collapse eventKey="{1}">
    //         <Card.Body>{description}</Card.Body>
    //       </Accordion.Collapse>
    //     </Card>
    //   )
    // })
