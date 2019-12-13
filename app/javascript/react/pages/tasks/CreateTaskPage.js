import React from "react"
import PropTypes from "prop-types"
import { createTask } from "../../api/tasks/tasks-api"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button, ListGroup, ListGroupItem } from 'react-bootstrap'


function CreateTaskPage(props) { // this should be called JobCard component
    const {apiJobsData, loadJobs, loadTasks, apiTasksData} = props

    const {paramJobId} = useParams() // the id of the job that we are using
    const [ taskSuccess, setTaskSuccess ] = useState(false)
    const [ goBack, setGoBack ] = useState(false)
    const [ tasksCreatedDone, setTasksCreatedDone ] = useState(false)
    const [ taskData, setTaskData ] = useState(
        {
            description: '',
            job_id: parseInt(paramJobId, 10)
        }
    )

    function handleChange(event) {
        const newTaskData = {...taskData, [event.target.name]: event.target.value}
        setTaskData(newTaskData)
    }

    function handleBackClick() {
        setGoBack(true)
    }

    function taskCreatedSuccess() { // this function occurs once a task is created so we can create another task
        setTaskSuccess(true)
        setTaskData({ description: '', job_id: parseInt(paramJobId, 10)})
        loadTasks()
    }

    function handleCreateTask() {
        createTask(taskData)
        .then(() => {
            taskCreatedSuccess()
        })
    }

    function handleDoneClick() {
        setTasksCreatedDone(true)
    }

    useEffect(() => { // to constantly load the tasks
        loadTasks()
    },[taskSuccess])

    const currentJobTasks = [...apiTasksData].reverse().map((task, index) => {
        const {id, name, job_id, description} = task

        return (
            <div key={index}>
                {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
                {job_id == paramJobId &&
                <ListGroupItem> {description} </ListGroupItem>
                }
            </div>
        )
    })

    return (
        <React.Fragment>
            <div className="formContainer editorcreateforms">
                <h1> Add Tasks for this Job </h1>
                <ListGroup className="tasks">
                  {currentJobTasks}
                </ListGroup>
            <Form>
              <Form.Group>
                 <Form.Label>Title:</Form.Label>
                 <Form.Control
                   type="text"
                   name="title"
                   onChange={handleChange}
                   value={taskData.title}
                 />
              </Form.Group>
              <Form.Group>
                 <Form.Label>Description:</Form.Label>
                 <Form.Control
                   type="text"
                   name="description"
                   onChange={handleChange}
                   value={taskData.description}
                 />
              </Form.Group>
              <Form.Group>
                 <Form.Label>Location:</Form.Label>
                 <Form.Control
                   type="text"
                   name="location"
                   onChange={handleChange}
                   value={taskData.location}
                 />
              </Form.Group>
              <Form.Group>
                 <Form.Label>Start Time:</Form.Label>
                 <Form.Control
                   type="datetime-local"
                   name="start_time"
                   onChange={handleChange}
                   value={taskData.start_time}
                 />
              </Form.Group>
              <Form.Group>
                 <Form.Label>End Time:</Form.Label>
                 <Form.Control
                   type="datetime-local"
                   name="end_time"
                   onChange={handleChange}
                   value={taskData.end_time}
                 />
              </Form.Group>
            <ButtonToolbar className="formbuttons">
            <Button className="centerbutton" onClick={handleBackClick}>
            Back
            </Button>
            <Button className="centerbutton" onClick={handleCreateTask}>
            Create Task
            </Button>
            <Button className="centerbutton" onClick={handleDoneClick}>
            Done
            </Button>
            </ButtonToolbar>
            </Form>
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
