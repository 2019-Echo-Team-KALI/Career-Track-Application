import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function CurrentJobCard(props) { // this should be called JobCard component
    const {apiJobsData, loadJobs, loadTasks, apiTasksData} = props

    const { paramJobId } = useParams()

    const [ currentJob, setCurrentJob ] = useState({
        name: '',
        title: '',
        description: '',
        url: '',
    })

    const [ apiTasks, setApiTasks ] = useState(apiTasksData)

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

    const currentJobTasks = apiTasks.map(task => {
        const {id, name, job_id} = task

        return (
            <h1> Task: {id} - name </h1>
        )
    })

    return (
        <div>
            <h1> Test ID: {paramJobId} </h1>
            <h1> Name: {name} - Title: {title}</h1>
            <h2> Description: {description} </h2>
            <h2> Tasks: {} </h2>
            <h2> Url:{url} </h2>
        </div>

    )
}

export default CurrentJobCard
