
import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Accordion, Form, ButtonToolbar, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';
import { editJob } from "../../api/jobs/jobs-api"

const JobCardComponent = ({jobObj, handleReload}) => {

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
        .then(() => {
            handleReload()
        })
    }
    console.log(currentJob)

    return(
      <div>
          <div className="card mb-3" >
            <Link style ={{textAlign: 'center', width: '100%'}}to={`/jobs/${jobObj.id}`}>  
              <Button  variant="outline-dark" style={{width: '100%', zIndex: 1, borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none'}}>

                <Card.Title >{jobObj.name}</Card.Title>
                  <Card.Title style ={{fontSize: '75%'}}>{jobObj.title}</Card.Title>
                <hr  style={{marginBottom: '0em', marginTop: '-0.1em'}} />
              </Button>

            </Link> 
              
              <Button style = {{textAlign: 'center', textTransform: 'capitalize',padding: '2%'}} variant = 'secondary'onClick = {opener}> Change Job Status </Button> 

              <Card.Text>


              {categoryOpen &&

                <Form style = {{display: 'flex', marginTop: '3%'}}>
                  <Form.Group controlId="controlSelect1" style = {{display: 'inline-block', marginLeft: '2%', marginBottom: '0em'}}>
                      <Form.Control
                          style = {{width: '140%'}}
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

                  <Button variant = 'success' style = {{ display: 'inlineBlock', height: '70%',marginRight: '1%', marginLeft: '21%', marginBottom: '0.5em'}}onClick={handleFinishEdit}>Change</Button>
                  


              </Form>
              }


              </Card.Text>

          </div>


      </div>
    )
}

export default JobCardComponent
