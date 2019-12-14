import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ButtonToolbar, Button, Card, ListGroup, Jumbotron, Accordion, InputGroup, FormControl } from 'react-bootstrap'
import { moment } from 'moment'


function CurrentJobPage(props) { // this should be called JobCard component
    const {apiJobsData, loadJobs, loadTasks, apiTasksData} = props

    const { paramJobId } = useParams()

    const [goBack, setGoBack] = useState(false)
    const [goEdit, setGoEdit] = useState(false)
    const [ currentJob, setCurrentJob ] = useState({
        name: '',
        title: '',
        description: '',
        url: '',
    })



    useEffect(() => {
        loadJob()
        loadTasks()
    },[])



    function getJob() {
        return fetch(`/jobs/${paramJobId}`)
            .then( resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    return Promise.new(() => {   {/*need to fix this*/}
                        resolve({error: 'there was an error'})
                    })
                }
            })
    }

    function loadJob(){
        getJob()
            .then(job => {
                if(job.errors) {
                    setErrors(job.errors)
                }
                setCurrentJob(job)
            })
    }


    const { name, title, description, tasks, url, user_id } = currentJob

    const currentJobTasks = apiTasksData.map((task, index) => {
        const {id, name, job_id, title, location, start_time, end_time, description} = task
        
       
        
        return (
            <div key={index}>
                {job_id == paramJobId &&
                    <div> 
                        <Accordion defaultActiveKey="0">
                            <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" >
                                {title}: {description}
                            </Accordion.Toggle>
                            
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {location}: {start_time.toString()} - {end_time}
                                </Card.Body>
                            </Accordion.Collapse>
                            </Card>
                        </Accordion > 

                    </div> 
                }
            </div>
        )
    })

    function handleEdit() {
        console.log("Edit,", paramJobId)
        setGoEdit(true)
    }
    function deleteJob(id) {
        return fetch(`/jobs/${id}`, {
            method: 'DELETE'
        })
        .then(resp => {
            if (resp.status === 200) {
                setGoBack(true)
            } else {
                resp.json()
                .then(payload => {
                    setErrors(payload.error)
                })
            }
        })
    }

    function handleDelete(){
        deleteJob(paramJobId)
    }

    function handleBack() {
        setGoBack(true)
    }


    return (
            <div className = "currentjob">

            <Jumbotron>
                <h1 style={{display: 'inline'}}><b>{name}:  </b></h1>
                <h3 style={{textTransform: 'capitalize',display: 'inline'}}>{title}</h3>
                <p>
                {description}
                </p>

                <ListGroup >
                    
                    <ListGroup.Item>
                      <h4 style ={{textAlign: 'center'}}>Tasks </h4> 
                        <br /> 
                        {currentJobTasks} 
                    </ListGroup.Item>
                </ListGroup>
                <br />
                <br />
                <ButtonToolbar style={{display: 'flex'}}>

                        <Button variant='info' onClick={handleBack} style={{marginRight: '1em'}}>Go Back to Main Page</Button>

                        <Button
                            variant='info' 
                            style={{marginRight: '1em'}}
                            onClick={() => handleDelete(paramJobId)}>
                            Delete
                        </Button>

                        <Button variant='info' style={{marginRight: '1em'}} >
                            <Link to={`/jobs/edit/${paramJobId}`}>
                                <span style = {{color: 'white'}}>Edit Job Details</span>
                            </Link>
                        </Button>

                        <Button variant='info'  style={{marginRight: '1em'}}>
                            <Link to={`/jobs/${paramJobId}/edittaskpage`}>
                                <span style = {{color: 'white'}}>Edit Task Details</span>
                            </Link>
                        </Button>


                        <Button variant='info'  style={{marginRight: '1em'}}>
                            <Link to={`/jobs/${paramJobId}/createtaskpage`}>
                                <span style = {{color: 'white'}}>Add Tasks</span>
                            </Link>
                        </Button>
                    </ButtonToolbar>
            </Jumbotron>





            {goBack &&
                <Redirect to='/maincareerpage'/>
            }

        </div>

    )
}

export default CurrentJobPage
