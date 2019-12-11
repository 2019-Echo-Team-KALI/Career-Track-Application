import React from "react"
import PropTypes from "prop-types"
import arvin from './arvinlleva.jpg'
import MainTaskList from './pages/tasks/tasklist/MainTaskList'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';
function ProfileCard(props) {

  const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData } = props

  useEffect(() => { // we need lifecycle hook here to reload the data whenever we create a page, we may need to rename the load functions to make things easier
      // the load functions set the data
      loadJobs()
      loadTasks()
  },[])

  return(

    <Sticky>

    <Card style={{ width: '16%', height: '59%',  display: 'inline-block', marginLeft: '2.5em', marginTop: '3em', marginBottom: '15em'}}>
      <Card.Img variant="top" src={arvin} />
        <Card.Body style={{marginBottom: '-0.8em'}}>
          <Card.Title><u> Arvin</u>: DEVELOPER</Card.Title>
        </Card.Body>  
        <div >
        <Card.Body >
          <Card.Title style={{marginBottom: '-0.8em'}}><u>Task List:</u></Card.Title>
        </Card.Body>
          <div style ={{maxHeight: '20%'}}> 
            <div style={{ height: '500px', overflowY: 'scroll' }}>
              <MainTaskList
                    apiTasksData={apiTasksData}
                    apiJobsData={apiJobsData}
                    current_user_id={current_user_id}
                    />
                  <br />
            </div> 
          </div>
        </div>
    

    </Card>

    </Sticky>


 )
}

export default ProfileCard
