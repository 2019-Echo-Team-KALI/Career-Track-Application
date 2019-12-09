import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function EditCurrentJob({apiJobsData, loadJobs}) { // this is equivalent to const {apiJobsData, loadJobs} = props for decontructoring
    const { paramEditId } = useParams() // this will be used to get the current job that we want to edit
    const [goBack, setGoBack] = useState(false)
    const [goEdit, setGoEdit] = useState(false)
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

    const { name, title, description, tasks, url, user_id } = currentJob

    function handleFinishEdit() {
        console.log("Edit,", paramEditId)
        //setGoEdit(true)
    }

    function handleBack() {
        setGoBack(true)
    }

    return(
        <React.Fragment>
            <h1>This is the EditCurrentJob page</h1>
            <div>
                <h1> Test ID: {paramEditId} </h1>
                <h1> Name: {name} - Title: {title}</h1>
                <h2> Description: {description} </h2>
                <h2> Tasks:  </h2>
                <h2> Url:{url} </h2>
                <button onClick={handleBack}>Go Back to Main Page</button>
                <button onClick={() => handleFinishEdit()}>
                    Complete Edits
                </button>
                {goBack &&
                    <Redirect to={`/jobs/${paramEditId}`}/>
                }

            </div>
        </React.Fragment>
    )
}

export default EditCurrentJob
