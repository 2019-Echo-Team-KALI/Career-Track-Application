import React from 'react' 
import PropTypes from 'prop-types'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'

const JobCard = (props) => {
    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData, getTask } = props

    const displayJobs2 = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj
        
        return(
          <div className="card mb-3" key={index}>
    
            <Card style={{zIndex: 1}}>
              <Card.Body>
                <Card.Title><a href={`/jobs/${id}`}><b>{name}</b></a></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
                
                <Card.Footer>
                  <small className="text-muted" style={{borderStyle: 'edge'}}>{description}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
    
          </div>
        )
    })

    return(
        <div> 
            {displayJobs2}  
        </div>
    )
}


export default JobCard
