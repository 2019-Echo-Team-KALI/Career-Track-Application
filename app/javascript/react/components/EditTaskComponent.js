import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button } from 'react-bootstrap'
import { editTask, getTask, deleteTask } from '../api/tasks/tasks-api'

function EditTaskComponent(props) {
    const {id, name, job_id, description} = props
    const [ taskDeleteSuccess, setTaskDeleteSuccess ] = useState(false)
    const [ taskEditSuccess, setTaskEditSuccess ] = useState(false)
    const [ taskData, setTaskData ] = useState(
        {
            description: ""
        }
    )

    function loadTask(id) {
        getTask(id)
            .then(tasks => {
                if(tasks.errors) {
                    setErrors(tasks.errors)
                }
                console.log("Tasks", tasks)
                setTaskData(tasks)
                setTaskEditSuccess(true)
                console.log("taskData", taskData)
            })
    }

    function handleTaskEdit() {
        editTask(taskData, id)
    }

    function handleChange(event) {
        const newTaskData = {...taskData, [event.target.name]: event.target.value}
        setTaskData(newTaskData)
    }

    function handleTaskDelete() {
        deleteTask(id)
        .then(() => {
            setTaskDeleteSuccess(true)
            console.log("Deleted")
        })
    }

    useEffect(() => {
        loadTask(id)
    },[])

    return(
        <div>
            <Form className = "formContainer">
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
                 name="startTime"
                 onChange={handleChange}
                 value={taskData.startTime}
               />
            </Form.Group>
            <Form.Group>
               <Form.Label>End Time:</Form.Label>
               <Form.Control
                 type="datetime-local"
                 name="endTime"
                 onChange={handleChange}
                 value={taskData.endTime}
               />
            </Form.Group>
            <Button
                className="centerbutton"
                onClick={handleTaskDelete}
            >
                Delete Tasks
            </Button>
                <Button
                    className="centerbutton"
                    onClick={handleTaskEdit}
                >
                    Complete Edits
                </Button>
            </Form>

            {taskEditSuccess &&
                <Redirect to={`/jobs/${job_id}/edittaskpage`}/>
            }
            {setTaskDeleteSuccess &&
                <Redirect to={`/jobs/${job_id}/edittaskpage`}/>
            }


        </div>
    )
}



export default EditTaskComponent
