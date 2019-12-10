import React from "react"
import PropTypes from "prop-types"
import arvin from './arvinlleva.jpg'
import MainTaskList from './pages/tasks/tasklist/MainTaskList'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function ProfileCard(props) {

  const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData } = props

  useEffect(() => { // we need lifecycle hook here to reload the data whenever we create a page, we may need to rename the load functions to make things easier
      // the load functions set the data
      loadJobs()
      loadTasks()
  },[])

  return(

  <Card style={{ width: '15%', position: 'sticky',  display: 'inline-block', marginLeft: '2.5em', marginTop: '4.3em'}}>
    <Card.Img variant="top" src={arvin} />
    <Card.Body>
      <Card.Title>Arvin</Card.Title>
      <Card.Text>
        Hi I am Arvin and this is my description section where I get to tell you all about me!!
      </Card.Text>
    </Card.Body>
      <MainTaskList

          apiTasksData={apiTasksData}
          apiJobsData={apiJobsData}
          current_user_id={current_user_id}
          />

    <br />
    <Card.Body>
      <Card.Link href="#">Random Link 1</Card.Link>
      <Card.Link href="#">Random Link2</Card.Link>
    </Card.Body>

  </Card>


 )
}

export default ProfileCard
