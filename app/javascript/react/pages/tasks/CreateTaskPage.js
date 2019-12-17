import React from "react"
import PropTypes from "prop-types"
import { createTask } from "../../api/tasks/tasks-api"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button, ListGroup, ListGroupItem, Jumbotron } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import AddToCalendar from 'react-add-to-calendar';
import {getJob} from "../../api/jobs/jobs-api"

function CreateTaskPage(props) { // this should be called JobCard component
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
            start_time: new Date(),
            end_time: new Date()
        }
    )

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
        setTaskData({ description: '', job_id: parseInt(paramJobId, 10), title: '', location: '', start_time: new Date(), end_time: new Date()})
        loadTasks()
    }

    function handleCreateTask() {
      if (!taskData.title) {
        alert("Please Enter a title for the task")
      }  else {
        createTask(taskData)
        setAddEvent(false)
        .then(successTask => {
            console.log("Success! New Task: ", successTask)
            taskCreatedSuccess()
        })
       }
    }

    function handleDoneClick() {
        setTasksCreatedDone(true)
    }

    function handleAddEvent() {
        setAddEvent(true)
        console.log(addEvent)

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
        const {job_id, title, description, start_time, end_time, location} = task

        let modifiedTask =
         {title: task.title,
          description: task.description,
          startTime: task.start_time,
          endTime: task.end_time,
          location: task.location}

        return (
            <div key={index}>
                {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
                {job_id == paramJobId &&
                <ListGroupItem> {title} </ListGroupItem>
                }
                {job_id == paramJobId &&
                <AddToCalendar event={modifiedTask} />
                }

            </div>
        )
    })

    return (
        <React.Fragment>
            <div style={{width: '37%', marginLeft: '12%', marginRight: '1%', marginTop: '3em', display: 'inline-block'}}>
                <Jumbotron>
                    <h1 style={{textAlign: 'center'}}> Add Tasks for this {jobOfTask.title} position </h1>
                    <Form style={{marginTop: '2em'}}>
                        <Form.Group>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={taskData.title}
                                style={{backgroundColor: 'white'}}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={taskData.description}
                                style={{backgroundColor: 'white'}}
                            />
                        </Form.Group>

                        <ButtonToolbar>
                            <Button onClick={handleAddEvent}>Add Event
                            </Button>
                        </ButtonToolbar>

                        {addEvent &&
                        <Form.Group>
                            <Form.Label>Location:</Form.Label>
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


                        <ButtonToolbar style={{display: 'flex', marginTop: '2em'}}>
                            <div>
                                <Button variant = 'info' style={{marginRight: '1em'}} onClick={handleCreateTask}>
                                    Create Task
                                </Button>
                            </div>

                            <div style={{float: 'right', marginLeft: 'auto'}}>
                                <Button variant = 'info' onClick={handleDoneClick}>
                                    Done Adding Tasks
                                </Button>
                            </div>
                        </ButtonToolbar>

                    </Form>
                </Jumbotron>
            </div>


            <div style={{display: 'inline-block', float: 'right', width: '37%', marginRight: '12%', marginLeft: '1%', marginTop: '3em'}}>
                <Jumbotron>
                    <h4 style ={{textAlign: 'center'}}><u>Tasks</u> </h4>
                    <ListGroup className="tasks">
                        {currentJobTasks}
                    </ListGroup>
                </Jumbotron>
            </div>

            <div style={{display: 'block', width: '66%', marginLeft: '12%'}}>
                <ButtonToolbar>
                    <Button variant = 'dark' style={{marginRight: '1em'}} onClick={handleBackClick}>
                    Main Page
                    </Button>
                </ButtonToolbar>
            </div>

            {tasksCreatedDone &&
               <Redirect to={`/jobs/${paramJobId}`} />
            }
            {goBack &&
                <Redirect to={`/jobs/${paramJobId}`} />
            }
            {taskSuccess &&
                <Redirect to={`/jobs/${paramJobId}/createtaskpage`} />
            }
        </React.Fragment>
    )
}

export default CreateTaskPage
