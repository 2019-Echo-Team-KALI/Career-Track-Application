import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { Accordion, Card, Button, Toast, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'

import { useState, useEffect } from 'react'


function MainTaskComponent(props) { // this is being called from the App.js

    const { title, description, job_id, user_id, apiJobsData} = props // we need the job id to compare
    const [jobOfTask, setJobOfTask] = useState({})

    console.log(apiJobsData, "jobsdata", "---", )

    useEffect(() => {
        loadJob()
    },[])
 

    function getJob() {
        return fetch(`/jobs/${job_id}`)
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
                setJobOfTask(job)
            })
    }
    

    return(
        <div style={{textAlign: 'center', marginBottom: '0.5em'}}>
            <Link to={`/jobs/${job_id}`}>
                <button className="btn btn-outline-warning" style={{borderRight: 'none',borderLeft: 'none',borderBottom: 'none',  width: '87%', color: 'black', textAlign: 'left'}}type="button" > 
                    {jobOfTask.name} <br /><div style={{textTransform: 'lowercase', opacity: 0.6}}>{title}</div> 
                </button>
            </Link>
        </div>
    )
}

export default MainTaskComponent

// {
//     description: "Task1 for job 1 User 1",
//     job_id: 1
// },
