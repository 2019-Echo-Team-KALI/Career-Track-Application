
import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Accordion, Form, ButtonToolbar, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';
import { editJob } from "../../api/jobs/jobs-api"

const JobCardComponent = ({jobObj}) => {
    const [ reload, setReload ] = useState(false)
    const [ buttonOpen, setButtonOpen ] = useState(true)

    const [ categoryOpen, setCategoryOpen ] = useState(false)
    const opener = () => {
      setCategoryOpen(!categoryOpen)
      setButtonOpen(!buttonOpen)
    }

    



    const [ currentJob, setCurrentJob ] = useState(
    {
        ...jobObj,
        category:jobObj.category
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
              
                <Button style = {{textAlign: 'center', textTransform: 'capitalize'}} variant = 'secondary'onClick = {opener}> Select Category </Button> 
              

              <Card.Text>


              {categoryOpen && 

                <Form style = {{display: 'flex', marginTop: '3%'}}>
                  <Form.Group controlId="controlSelect1" style = {{display: 'flex', marginLeft: '1%', marginBottom: '0em', width: '150%'}}>
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
                  <Button variant = 'success' style = {{display: 'inlineBlock', height: '70%',marginRight: '0.5%', marginLeft: '21%', marginBottom: '0.5em'}}onClick={handleFinishEdit}>Change</Button>
                  

              </Form>
              }
              

              </Card.Text>

          </div>


      </div>
    )
}

export default JobCardComponent
