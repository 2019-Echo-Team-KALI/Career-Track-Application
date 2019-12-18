import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button } from 'react-bootstrap'
import { editTask, getTask, deleteTask } from '../api/tasks/tasks-api'

function EditTaskComponent(props) {
    const {id, name, job_id, description, handleReload} = props
    const [ taskDeleteSuccess, setTaskDeleteSuccess ] = useState(false)
    const [ taskEditSuccess, setTaskEditSuccess ] = useState(false)
    const [ taskData, setTaskData ] = useState(
        {
            title: "",
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
        if (!taskData.title) {
            alert("Please Enter a title for the task")
        } else {
            editTask(taskData, id)
            alert("Task successfully updated!")

        }

    }

    function handleChange(event) {
        const newTaskData = {...taskData, [event.target.name]: event.target.value}
        setTaskData(newTaskData)
    }

    function handleTaskDelete() {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask(id)
            .then(() => {
                setTaskDeleteSuccess(!taskDeleteSuccess)
                alert("The task has been successfully deleted.")
                handleReload()
            })
        }
    }

    useEffect(() => {
        loadTask(id)
    },[])

    return(
        <div>
            <Form className = "formContainer">

            <Form.Group controlId="formGroupDescription">
              <Form.Label>Task: </Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleChange}
                value={taskData.title}
              />
            </Form.Group>
            <Form.Group controlId="formGroupDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={handleChange}
                value={taskData.description}
              />
            </Form.Group>


                <Button
                    variant = 'info'
                    onClick={handleTaskEdit}
                >
                    Complete Edits
                </Button>
                <Button
                    variant = 'danger'
                    onClick={handleTaskDelete}
                    style = {{float:'right'}}
                >
                    Delete Task
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
