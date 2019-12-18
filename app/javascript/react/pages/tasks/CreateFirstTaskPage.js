import React from "react"
import PropTypes from "prop-types"
import { createTask } from "../../api/tasks/tasks-api"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Accordion, Card, Form, ButtonToolbar, Button, ListGroup, ListGroupItem, Jumbotron } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import AddToCalendar from 'react-add-to-calendar';
import {getJob} from "../../api/jobs/jobs-api"
import TaskCreatedComponent from '../../components/TaskCreatedComponent'
import  moment  from 'moment'


function CreateFirstTaskPage(props) { // this should be called JobCard component
    const {apiJobsData, loadJobs, loadTasks, apiTasksData} = props

    const {paramJobId} = useParams() // the id of the job that we are using
    const [ taskSuccess, setTaskSuccess ] = useState(false)
    const [ goBack, setGoBack ] = useState(false)
    const [ tasksCreatedDone, setTasksCreatedDone ] = useState(false)
    const [ addEvent, setAddEvent ] = useState(false)
    const [ jobOfTask, setJobOfTask ] = useState({})

    const [ taskData, setTaskData ] = useState(
        {
            description: '',
            job_id: parseInt(paramJobId, 10),
            title: '',
            location: '',
            start_time: new Date(),
            end_time: new Date(),
            display_add_to_calendar: false
        }
    )

    useEffect(()=> {
        console.log("something")
        if (taskData.location) {
            setTaskData({
                ...taskData,
                display_add_to_calendar: true
            })
        }
    },[taskData.location])

    function handleChange(event) {
        const newTaskData = {...taskData, [event.target.name]: event.target.value}
        setTaskData(newTaskData)
    }

    function onStartChange(start) {
      const newStartData = {...taskData, start_time: start}
      setTaskData(newStartData)
    }

    function onEndChange(end) {
      const newEndData = {...taskData, end_time: end}
      setTaskData(newEndData)
    }

    function handleBackClick() {
        setGoBack(true)
    }

    function taskCreatedSuccess() { // this function occurs once a task is created so we can create another task
        setTaskSuccess(true)
        setTaskData(
            {
                description: '',
                job_id: parseInt(paramJobId, 10),
                title: '', location: '',
                start_time: new Date(),
                end_time: new Date(),
                display_add_to_calendar: false
            }
        )
        setAddEvent(false)
        loadTasks()
    }

    function handleCreateTask() {
      if (!taskData.title) {
        alert("Please Enter a title for the task")
      }  else {
        createTask(taskData)
        .then(taskObjData => {
            console.log("Task Obj Data", taskObjData)

            taskCreatedSuccess()
        })
       }
    }

    function handleDoneClick() {
        setTasksCreatedDone(true)
    }

    function handleAddEvent() {
        setAddEvent(!addEvent)


    }

    function loadJob(){
      getJob(paramJobId)
          .then(job => {
              if(job.errors) {
                  setErrors(job.errors)
              }
              setJobOfTask(job)
          })
  }

    useEffect(() => { // to constantly load the tasks
        loadTasks()
    },[taskSuccess])

    useEffect(() => {
      loadJob()
    },[])

    const currentJobTasks = [...apiTasksData].reverse().map((task, index) => {
        const {job_id, title, description, start_time, end_time, location, display_add_to_calendar} = task

        let modifiedTask =
         {
            title: task.title,
            description: task.description,
            startTime: task.start_time,
            endTime: task.end_time,
            location: task.location
        }

        return (
            <div key={index}>
                {job_id == paramJobId &&
                    <div>
                        <Accordion defaultActiveKey="0" style = {{marginBottom: '2%'}}>
                            <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" style = {{borderWidth: 'thin'}} >
                                Task: {title}
                                <br /> <hr style ={{marginTop: '0em'}}/>
                                 Description: {description}
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1" >
                                <Card.Body>
                                    <b><u>Location: {location}</u></b>
                                    <br /> <b>Start time :</b> {moment(start_time).format('MMMM Do YYYY, h:mm:ss a ')}
                                    <br /> <b>End time:</b>  {moment(end_time).format('MMMM Do YYYY, h:mm:ss a ')}

                                    {display_add_to_calendar &&
                                        <div>
                                            <AddToCalendar event={modifiedTask}/>
                                        </div>
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                            </Card>
                        </Accordion >

                    </div>
                }
            </div>
        )
    })

    return (
        <React.Fragment>
            <div style={{width: '37%', marginLeft: '12%', marginRight: '1%', marginTop: '3em', display: 'inline-block'}}>
                <Jumbotron style = {{paddingBottom: '2%'}}>
                <Card.Header variant = 'light' style ={{textTransform: 'uppercase',textAlign: 'center', fontSize: '200%'}}><h4>Add Tasks for this {jobOfTask.title} position at {jobOfTask.name}</h4> </Card.Header>

                    <Form style={{marginTop: '2em'}}>
                        <Form.Group>
                            <Form.Label>Task Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={taskData.title}
                                style={{backgroundColor: 'white'}}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Task Description:</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={taskData.description}
                                style={{backgroundColor: 'white'}}
                            />
                        </Form.Group>


                        <ButtonToolbar style={{marginBottom: '2em'}}>
                            <Button variant="outline-secondary" style={{marginTop: '1em'}}onClick={handleAddEvent} block>Add Event
                            </Button>
                        </ButtonToolbar>

                        {addEvent &&
                        <Form.Group>
                            <Form.Label>Task Location:</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                onChange={handleChange}
                                value={taskData.location}
                                style={{backgroundColor: 'white'}}
                                />
                        </Form.Group>

                        }
                        {addEvent &&
                        <Form.Group>
                            <Form.Label>Start Time:</Form.Label>
                            <DateTimePicker
                                onChange={onStartChange}
                                value={taskData.start_time}
                            />
                        </Form.Group>
                        }
                        {addEvent &&
                        <Form.Group>
                            <Form.Label>End Time:</Form.Label>
                            <DateTimePicker
                                onChange={onEndChange}
                                value={taskData.end_time}
                            />
                        </Form.Group>
                        }

                        <hr style={{marginTop: '4em', marginBottom: '2em'}}/>

                        <div>
                            <Button variant = 'info' style={{marginLeft: '38.6%'}} onClick={handleCreateTask}>
                                Add the Task
                            </Button>
                        </div>

                    </Form>
                </Jumbotron>
            </div>


            <Jumbotron style={{display: 'inline-block', paddingBottom: '1%', float: 'right', width: '37%', marginRight: '12%', marginLeft: '1%', marginTop: '3em'}}>
                <Card.Header variant = 'light' style ={{textTransform: 'uppercase',textAlign: 'center', fontSize: '200%'}}><h4>Added Tasks </h4> </Card.Header>

                <ListGroup  style = {{height: '21.4rem', overflowY: 'scroll',  display: 'block'}}>
                    <ListGroup.Item style =  {{height: '20em', overflowY: 'scroll'}}>
                        {currentJobTasks}
                    </ListGroup.Item>
                </ListGroup>
                <hr style={{ marginBottom: '1.7em', marginTop: '1.4%'}}/>


                <div style={{float: 'center', textAlign: 'center'}}>
                    <Button variant = 'info' onClick={handleDoneClick}>
                        Done Adding Tasks
                    </Button>
                </div>
            </Jumbotron>

            <div style={{display: 'block', width: '66%', marginLeft: '12%'}}>
                <ButtonToolbar>
                    <Button variant = 'dark' style={{marginRight: '1em'}} onClick={handleBackClick}>
                    Go to Job Details
                    </Button>
                </ButtonToolbar>
            </div>

            {tasksCreatedDone &&
               <Redirect to={`/maincareerpage`} />
            }
            {goBack &&
                <Redirect to={`/jobs/${paramJobId}`} />
            }
            {taskSuccess &&
                <Redirect to={`/jobs/${paramJobId}/createfirsttaskpage`} />
            }
        </React.Fragment>
    )
}

export default CreateFirstTaskPage
