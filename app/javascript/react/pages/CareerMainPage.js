import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import arvin from '../images/arvinlleva.jpg'
import ProfileCard from '../components/ProfileCard'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';
import Category from '../components/Category'



function CareerMainPage(props) {

    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData, getTask } = props


    useEffect(() => { // we need lifecycle hook here to reload the data whenever we create a page, we may need to rename the load functions to make things easier
        // the load functions set the data
        loadJobs()
        loadTasks()
    },[])


    

    

    return (
      <React.Fragment>
          <div style={{paddingLeft: '2em', borderStyle: 'edge', width: '80%', float: 'right', marginTop: '1em'}}>

          

            <Category 
              current_user_id={current_user_id}
              loadJobs = {loadJobs}
              loadTasks = {loadTasks}
              apiJobsData={apiJobsData}
              apiTasksData={apiTasksData}
              getTask = {getTask}
            /> 
          

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
