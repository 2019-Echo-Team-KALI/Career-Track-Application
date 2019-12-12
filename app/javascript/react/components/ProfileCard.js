import React from "react"
import PropTypes from "prop-types"
import arvin from '../images/arvinlleva.jpg'
import MainTaskList from './MainTaskList'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';

function ProfileCard(props) {

  const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData } = props

  useEffect(() => { 
      loadJobs()
      loadTasks()
  },[])

  return(

    <Sticky>
    
      
      
      <Card style={{ width: '16%', borderOpacity: 1, height: '59%',  marginTop: '2em', display: 'inline-block', marginLeft: '2.5em', marginBottom: '15em'}}>
        <Card.Img variant="top" src={arvin} />
          <Card.Body style={{marginBottom: '-0.8em'}}>
            <Card.Title style={{textAlign: 'center'}}>ARVIN:</Card.Title>
          </Card.Body>  
          <div >
          <Card.Body >
            <Card.Title style={{marginBottom: '-0.5em', textAlign: 'center'}}>Task List:</Card.Title>
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
