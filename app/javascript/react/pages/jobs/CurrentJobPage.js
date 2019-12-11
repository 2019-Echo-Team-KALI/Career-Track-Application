import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'



function CurrentJobPage(props) { // this should be called JobCard component
    const {apiJobsData, loadJobs, loadTasks, apiTasksData} = props

    const { paramJobId } = useParams()

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
        loadTasks()
    },[])



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

    const currentJobTasks = apiTasksData.map((task, index) => {
        const {id, name, job_id, description} = task

        return (
            <div key={index}>
                {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
                {job_id == paramJobId &&
                <h1> Task: {id} - {description} </h1>
                }
            </div>
        )
    })

    function handleEdit() {
        console.log("Edit,", paramJobId)
        setGoEdit(true)
    }
    function deleteJob(id) {
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

    function handleDelete(){
        deleteJob(paramJobId)
    }

    function handleBack() {
        setGoBack(true)
    }


    return (
        <div>
            <div className = "currentjob">
              <h1><span style = {{fontWeight: 'bold'}}>Company Name:</span> {name}</h1>
              <h2><span style = {{fontWeight: 'bold'}}>Title:</span> {title}</h2>
              <h3><span style = {{fontWeight: 'bold'}}>Url:</span>{url}</h3>
              <br />
              <h4><span style = {{fontWeight: 'bold'}}>Description:</span> {description} </h4>
              <h4><span style = {{fontWeight: 'bold'}}>Tasks:</span> {currentJobTasks} </h4>
            </div>
            <div className = "buttons">
            <ButtonToolbar>
              <Button onClick={handleBack}>Go Back to Main Page</Button>

              <Button
                  className="centerbutton"
                  onClick={() => handleDelete(paramJobId)}>
                  Delete
              </Button>

              <Button className="centerbutton">
                <Link to={`/jobs/edit/${paramJobId}`}>
                    <span style = {{color: 'white'}}>Edit Job Details</span>
                </Link>
              </Button>

              <Button className="centerbutton">
                <Link to={`/jobs/${paramJobId}/edittaskpage`}>
                    <span style = {{color: 'white'}}>Edit Task Details</span>
                </Link>
              </Button>

              </ButtonToolbar>
            </div>
            {goBack &&
                <Redirect to='/careermainpage'/>
            }

        </div>

    )
}

export default CurrentJobPage
