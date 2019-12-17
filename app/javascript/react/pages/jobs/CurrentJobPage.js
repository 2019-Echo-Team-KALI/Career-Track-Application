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
                                {title}: 
                                <br /> <hr style ={{marginTop: '0em'}}/> 
                                 {description}
                            </Accordion.Toggle>
                            
                            <Accordion.Collapse eventKey="1" >
                                <Card.Body>
                                    <b><u>{location}</u></b>: 
                                    <br /> <b>Start:</b> {moment(start_time).format('MMMM Do YYYY, h:mm:ss a ')} 
                                    <br /> <b>End:</b>  {moment(end_time).format('MMMM Do YYYY, h:mm:ss a ')}
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

    const { name, title, description, tasks, url, user_id, category } = currentJob

    return (
        <div className = "currentjob" style={{ marginBottom: '3%'}}>
            
            

            <Jumbotron style ={{width: '48%', height: '38.5em', display: 'inline-block', marginRight: '2%', verticalAlign: 'top'}}>
                    <div style = {{height: '22.3em'}}> 
                        <h1 style ={{marginBottom: '7%', textAlign: 'center'}}><u>{category}</u> </h1>
                        <h1 style={{display: 'inline'}}><b>{name}:  </b></h1>
                        <h3 style={{textTransform: 'capitalize',display: 'inline'}}>{title}</h3>
                        <p>
                            {description}
                        </p>
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
                                        Delete
                                    </Button>
                                </div> 
                        </ButtonToolbar>
                    </div> 

                </Jumbotron>

                <Jumbotron style ={{width: '48%', height: '38.5em', display: 'inline-block'}}>
                    {/*<h1>Status: {category}  </h1>
                    <h1 style={{display: 'inline'}}><b>{name}:  </b></h1>
                    <h3 style={{textTransform: 'capitalize',display: 'inline'}}>{title}</h3>
                    <p>
                    {description}
                    </p>*/}

                    <ListGroup >
                        <h4 style ={{textAlign: 'center'}}>Tasks </h4> 
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
