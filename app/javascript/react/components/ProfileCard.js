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
    
      
      
      <Card style={{ width: '16%', borderOpacity: 1, height: '59%',  marginTop: '1.5em', display: 'inline-block', marginLeft: '2.5em', marginBottom: '15em'}}>
        <Card.Img variant="top" src={arvin} style={{marginBottom: '-0.7em'}} />
        
          <Card.Body >
            <Card.Title style={{textAlign: 'center', marginBottom: '-5em'}}>ARVIN</Card.Title>
          </Card.Body>  
          <hr  style={{marginBottom: '0.em', marginTop: '-0.1em'}} />
          <div >
          <Card.Body >
            <Card.Text style={{marginBottom: '-0.5em', textAlign: 'center'}}>TASK LIST:</Card.Text>
          </Card.Body>

            <div style ={{maxHeight: '20%'}}> 
              <div style={{ height: '475px', overflowY: 'scroll' }}>
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
