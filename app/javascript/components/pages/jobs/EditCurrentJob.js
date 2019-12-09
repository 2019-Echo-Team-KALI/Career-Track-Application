import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function EditCurrentJob({apiJobsData, loadJobs}) { // this is equivalent to const {apiJobsData, loadJobs} = props for decontructoring
    const { paramEditId } = useParams() // this will be used to get the current job that we want to edit
    const [goBack, setGoBack] = useState(false)
    const [goEdit, setGoEdit] = useState(false)
    const [editComplete, setEditComplete] = useState(false)
    const [ currentJob, setCurrentJob ] = useState({
        name: '',
        title: '',
        description: '',
        url: '',
    })

    useEffect(() => {
        loadJob()
    },[])

    function getJob() {
        return fetch(`/jobs/${paramEditId}`)
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

    function editJob(job){
        return fetch(`/jobs/${paramEditId}`, {
            body: JSON.stringify(job),
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

    const { name, title, description, tasks, url, user_id } = currentJob

    function handleFinishEdit() {
        console.log("Edit,", paramEditId)
        editJob(currentJob)
    }

    function handleBack() {
        setGoBack(true)
    }

    function handleChange(event) {
        const newJobData = {...currentJob, [event.target.name]: event.target.value}
        setCurrentJob(newJobData)
    }

    return(
        <React.Fragment>
            {/* This is to show the user what the current job information that we have*/}
            <h1>This is the Edit CurrentJob of Id: {paramEditId} </h1>
            <div>
                <h1> Name: {name} </h1>
                <h1> Title: {title}</h1>
                <h2> Description: {description} </h2>
                <h2> Tasks:  </h2>
                <h2> Url:{url} </h2>

            </div>

            {/* The section below will be what we are editing*/}
            <div>
                <label>Name:</label>
                <input
                type="text"
                name="name"
                onChange={handleChange}
                value={currentJob.name}
                />
            </div>
            <div>
                <label>Title</label>
                <input
                type="text"
                name="title"
                onChange={handleChange}
                value={currentJob.title}
                />
            </div>

            <div>
                <label>Description</label>
                <input
                type="text"
                name="description"
                onChange={handleChange}
                value={currentJob.description}
                />
            </div>

            <div>
                <label>URL</label>
                <input
                type="text"
                name="url"
                onChange={handleChange}
                value={currentJob.url}
                />
            </div>

            <button onClick={handleBack}>Go Back to Main Page</button>
            <button onClick={handleFinishEdit}>
                Complete Edits
            </button>
            {goBack &&
                <Redirect to={`/jobs/${paramEditId}`}/>
            }
            {editComplete &&
                <Redirect to='/careermainpage'/>
            }


        </React.Fragment>
    )
}

export default EditCurrentJob
