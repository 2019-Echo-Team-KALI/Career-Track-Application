import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function CurrentJobCard(props) { // this should be called JobCard component
    const {apiJobsData, loadJobs, loadTasks, apiTasksData} = props

    const { paramJobId } = useParams()

    const [goBack, setGoBack] = useState(false)
    const [goEdit, setGoEdit] = useState(false)
    const [ apiTasks, setApiTasks ] = useState(apiTasksData)
    const [ currentJob, setCurrentJob ] = useState({
        name: '',
        title: '',
        description: '',
        url: '',
    })



    useEffect(() => {
        loadJob()
        loadTasks()
    },[])

    console.log("Tasks", apiTasks)

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
                setCurrentJob(job)
            })
    }


    const { name, title, description, tasks, url, user_id } = currentJob

    const currentJobTasks = apiTasks.map((task, index) => {
        const {id, name, job_id} = task

        return (
            <div key={index}>
                {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
                {job_id == paramJobId &&
                <h1> Task: {id} - name </h1>
                }
            </div>
        )
    })

    function handleEdit() {
        console.log("Edit,", paramJobId)
        setGoEdit(true)
    }
    function handleDelete(id) {
        console.log("Delete,", paramJobId)
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
    function handleBack() {
        setGoBack(true)
    }


    return (
        <div>
            <h1> Test ID: {paramJobId} </h1>
            <h1> Name: {name} - Title: {title}</h1>
            <h2> Description: {description} </h2>
            <h2> Tasks: {currentJobTasks} </h2>
            <h2> Url:{url} </h2>
            <button onClick={handleBack}>Go Back to Main Page</button>
            <button onClick={() => handleDelete(paramJobId)}>Delete</button>
            <button>
                <Link to={`/jobs/edit/${paramJobId}`}>
                    Edit
                </Link>
            </button>
            {goBack &&
                <Redirect to='/careermainpage'/>
            }

        </div>

    )
}

export default CurrentJobCard
