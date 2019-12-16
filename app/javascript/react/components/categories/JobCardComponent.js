
import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Accordion, Form, ButtonToolbar, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';
import { editJob } from "../../api/jobs/jobs-api"

const JobCardComponent = ({jobObj}) => {
    const [ reload, setReload ] = useState(false)

    const [ currentJob, setCurrentJob ] = useState(
    {
        ...jobObj,
        category: jobObj.category
    })

    const [ renderDropDown, setRenderDropDown ] = useState(false)

    function handleChange(event) {
        const newJobData = {...currentJob, [event.target.name]: event.target.value}
        setCurrentJob(newJobData)
    }

    function handleFinishEdit() {
        console.log(jobObj)
        console.log("edit complete")
        editJob(currentJob,currentJob.id)

    }
    console.log(currentJob)

    return(
      <div>
          <div className="card mb-3" >
              <Button  variant="outline-dark" style={{zIndex: 1, borderTop: 'none', borderRight: 'none', borderLeft: 'none'}}>
              <Link to={`/jobs/${jobObj.id}`}>

                <Card.Title >{jobObj.name}</Card.Title>
                <Card.Title style ={{fontSize: '65%'}}>{jobObj.title}</Card.Title>
                <hr  style={{marginBottom: '0.em', marginTop: '-0.1em'}} />


                  </Link>
              </Button>
              <Card.Text>
              <Form>
                  <Form.Group controlId="controlSelect1">
                      <Form.Label>Category Select:</Form.Label>
                      <Form.Control
                          as="select"
                          name="category"
                          onChange={handleChange}
                          value={currentJob.category}
                      >
                        <option value='Wish List'>Wish List</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer/Rejected">Offer/Rejected</option>


                      </Form.Control>
                    </Form.Group>

                    <ButtonToolbar className="formbuttons">
                      <Button variant = 'info' style={{marginRight: '1em'}}  onClick={handleFinishEdit}>Change</Button>
                    </ButtonToolbar>
                    </Form>
              </Card.Text>
          </div>


      </div>
    )
}

export default JobCardComponent
