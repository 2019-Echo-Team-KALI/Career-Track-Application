import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ButtonToolbar, Button, Card, ListGroup, Jumbotron, Accordion, InputGroup, FormControl } from 'react-bootstrap'
import  moment  from 'moment'


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
        category: ''
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
                console.log("job", job)
                setCurrentJob(job)
            })
    }



    const currentJobTasks = apiTasksData.map((task, index) => {
        const {id, name, job_id, title, location, start_time, end_time, description} = task



        return (
            <div key={index}>
                {job_id == paramJobId &&
                    <div>
                        <Accordion defaultActiveKey="0">
                            <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" style = {{borderStyle: 'solid',borderWidth: 'thin', borderBottom: 'none', borderLeft: 'none', borderRight: 'none'}} >
                                Task: {title}
                                <br /> <hr style ={{marginTop: '0em'}}/>
                                 Task Description: {description}
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1" >
                                <Card.Body>
                                    <b><u>Task Location: {location}</u></b>
                                    <br /> <b>Start time :</b> {moment(start_time).format('MMMM Do YYYY, h:mm:ss a ')}
                                    <br /> <b>End time:</b>  {moment(end_time).format('MMMM Do YYYY, h:mm:ss a ')}
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
        if (confirm("Are you sure?")) { // built in the browser methods, you can style it with online tools
            deleteJob(paramJobId)
        }
    }

    function handleBack() {
        setGoBack(true)
    }

    const { name, title, description, tasks, url, user_id, category } = currentJob

    return (
        <div className = "currentjob" style={{ marginBottom: '3%', alignContent: 'center'}}>


{/* */}
            <Jumbotron style ={{width: '48%', display: 'inline-block',height: '38.5em', marginRight: '2%', verticalAlign: 'top'}}>

                    {/*<div style = {{height: '22.3em'}}>
                        <h1 style ={{marginBottom: '7%', textAlign: 'center'}}><u>Job Details</u> </h1>
                        <h1 style={{textTransform: 'capitalize'}}><b>Company Name: {name}  </b></h1>
                        <h3 style={{textTransform: 'capitalize'}}>Position Title: {title}</h3>
                        <p>
                            Job Description: {description}
                        </p>
                        <h3 style={{textTransform: 'capitalize'}}>Job post URL: {url}</h3>
                        <h3 style={{textTransform: 'capitalize'}}>Current Status: {category}</h3>

                    /div>*/}
                    <div style = {{marginTop: '-4%', marginBottom: '17.5%'}}> 
                        <Card.Header style ={{textTransform: 'uppercase', fontSize: '200%', textAlign: 'center'}}>{name} </Card.Header>
                        <Card variant="light" style={{ width: '100%' }}>
                            <Card.Body>

                                <Card.Title>Position Title: {title} </Card.Title>
                                <Card.Title>Current Status: {category}</Card.Title>
                                <Card.Title>Job Post URL: {url}</Card.Title> 
                                <Card.Title style = {{display: 'inline'}}>
                                    Description: 
                                </Card.Title>
                                <Card.Text> 
                                    {description}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                    
                    <br />
                    <br />

                    <div style = {{}}>
                        <hr  style={{marginBottom: '0.em'}} />

                        <ButtonToolbar style={{display: 'flex'}}>


                                <div> 
                                    <Link to={`/jobs/edit/${paramJobId}`}>
                                        <Button variant='info'>
                                                <span style = {{color: 'white'}}>Edit Job</span>
                                        </Button>
                                    </Link>
                                </div> 


                                <div style = {{float: 'right', marginLeft: 'auto'}} >
                                    <Button
                                        variant='info' 
                                        onClick={() => handleDelete(paramJobId)}>
                                        Delete Job
                                    </Button>
                                </div>
                        </ButtonToolbar>
                    </div>

                </Jumbotron>

                <Jumbotron style ={{width: '48%', height: '38.5em', display: 'inline-block'}}>
                    

                    <ListGroup style = {{marginTop: '-4%'}} >
                        <Card.Header variant = 'light' style ={{textTransform: 'uppercase',textAlign: 'center', fontSize: '200%'}}>Tasks </Card.Header>
                        <ListGroup.Item style = {{height: '20em', overflowY: 'scroll'}}>
                            {currentJobTasks}
                        </ListGroup.Item>
                    </ListGroup>

                    <br />
                    <br />
                    <hr  style={{marginBottom: '0.em'}} />

                    <ButtonToolbar style={{display: 'flex'}}>

                            <div> 
                                <Link to={`/jobs/${paramJobId}/edittaskpage`}>
                                    <Button variant='info'>
                                            <span style = {{color: 'white'}}>Edit Task</span>
                                    </Button>
                                </Link> 
                            </div> 

                            <div style = {{float: 'right', marginLeft: 'auto'}}> 
                                <Link to={`/jobs/${paramJobId}/createtaskpage`}>
                                    <Button variant='info'>
                                            <span style = {{color: 'white'}}>Add Tasks</span>
                                    </Button>
                                </Link> 
                            </div> 
                            
                        </ButtonToolbar>
                </Jumbotron>
            
            <div style = {{display: 'block', marginBottom: '3%'}}> 
                <Button variant='dark' onClick={handleBack} style={{display: 'block'}}>Dash Board</Button>
            </div> 

            {goBack &&
                <Redirect to='/maincareerpage'/>
            }

        </div>
    )
}

export default CurrentJobPage
