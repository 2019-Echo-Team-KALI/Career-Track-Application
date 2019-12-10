import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function CreateTask(props) { // this should be called JobCard component

    const {paramJobId} = useParams()
    const [ taskSuccess, setTaskSuccess ] = useState(false)
    const [ taskData, setTaskData ] = useState(
        {
            description: ''
        }
    )

    function createTask(task) {
        return fetch('/tasks', {
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then( resp => {
            let json = resp.json()
            return json
        })
        .then(data => {
            // we're able to get the payload id once the job is created
            // here's a link to show the https://stackoverflow.com/questions/28916710/what-do-double-brackets-mean-in-javascript-and-how-to-access-them
            console.log("tasks's id", typeof data.id, data.id)
        })
    }

    function handleChange(event) {
        const newTaskData = {...taskData, [event.target.name]: event.target.value}
        setTaskData(newTaskData)
    }

    function handleClick() {
        createTask(taskData)
        .then(() => {

            setTaskSuccess(true)
        })
    }

    return (
        <React.Fragment>
            <div>
                <h1> Add Tasks for this Job </h1>
            </div>
            <div>
                 <label>Task Description:</label>
                 <input
                   type="text"
                   name="description"
                   onChange={handleChange}
                   value={taskData.description}
                 />
            </div>
            <button variant="primary" onClick={handleClick}>
            Create Task
            </button>
            {taskSuccess &&
               <Redirect to={`/jobs/${paramJobId}/createtask`} />
            }
        </React.Fragment>
    )
}

export default CreateTask
