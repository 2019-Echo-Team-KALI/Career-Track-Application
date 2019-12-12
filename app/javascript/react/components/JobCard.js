import React from 'react' 
import PropTypes from 'prop-types'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron, Link  } from 'react-bootstrap'

const JobCard = (props) => {
    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData, getTask } = props

    const displayJobs2 = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj 
        
        return(
          <div className="card mb-3" key={index} >
              <Button href={`/jobs/${id}`} variant="outline-dark" style={{zIndex: 1, borderTop: 'none', borderRight: 'none', borderLeft: 'none'}}>
                <Card.Title >{name}</Card.Title>
                <Card.Title style ={{fontSize: '65%'}}>{title}</Card.Title>
                <Card.Footer>
                    <small  style={{borderStyle: 'edge', fontSize: '95%', textTransform: 'capitalize'}}>{description}</small>
                  </Card.Footer>  
              </Button>
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
