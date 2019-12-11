import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button } from 'react-bootstrap'

function EditTaskComponent({apiTasksData, loadTasks}) {
    const { paramEditId } = useParams()
    const [goBack, setGoBack] = useState(false)
    const [goEdit, setGoEdit] = useState(false)
    const [editComplete, setEditComplete] = useState(false)
    const [ currentTask, setCurrentTask ] = useState({
        description: '',
        job_id: ''
    })

    useEffect(() => {
        loadTask()
    },[])

    function getTask() { 
        return fetch(`/tasks/${paramEditId}`)
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

    function loadTask(){
        getTask()
            .then(task => {
                if(task.errors) {
                    setErrors(task.errors)
                }
                setCurrentTask(task)
            })
    }
//We will need to change the paramEditId to something else
    function editTask(task){
        return fetch(`/tasks/${paramEditId}`, {
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH', 
        })
        .then(resp => {
            if (resp.status === 200) {
                let json = resp.json()
                setEditComplete(true)
                return json
            } else {
                resp.json()
                .then(payload => {
                    setErrors(payload.error)
                })
            }
        })
    }

    render(
        <h1>Task Component </h1>
    )
}

export default EditTaskComponent
