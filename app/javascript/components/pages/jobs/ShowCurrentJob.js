import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function ShowCurrentJob(props) {

    const {id} = useParams()
    const [ apiJobData, setApiJobData ] = useState({})
    const [ errors, setErrors ] = useState(null)
    const [ deleted, setDeleted ] = useState(false)
    const [ clicked, setClicked ] = useState(false)
    const [ updated, setUpdated ] = useState(false)
    const [ jobData, setJobData ] = useState(
        {
            name: '',
            title: '',
            description: '',
            url: '',
        }
    )

    function deleteJob(id) {
        return fetch(`/jobs/${id}`, {
            method: 'DELETE'
        })
        .then(resp => {
            if (resp.status === 200) {
                setDeleted(true)
            } else {
                resp.json()
                .then(payload => {
                    setErrors(payload.error)
                })
            }
        })
    }



    function getCurrentJob() {
        return fetch(`/jobs/${id}`)
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
        getCurrentJob()
            .then(job => {
                if(job.errors) {
                    setErrors(job.errors)
                }
                setApiJobData(job)
            })
    }
    useEffect(() => {
        loadJob()
    },[])

    function editJob(job){
        return fetch(`/jobs/${id}`, {
            body: JSON.stringify(job),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
        })
        .then(resp => {
            if (resp.status === 200) {
                let json = resp.json()
                setUpdated(true)
                return json
            } else {
                resp.json()
                .then(payload => {
                    setErrors(payload.error)
                })
            }
        })
    }

    function getJob() {
        return fetch('/jobs')
            .then( resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    return Promise.new(() => {
                        resolve({error: 'there was an error'})
                    })
                }
            })
    }

    function handleChange(event) {
        const newJobData = {...jobData, [event.target.name]: event.target.value}
        setJobData(newJobData)
    }

    function handleClick() {
        setClicked(true)
    }
    function handleEditClick() {
        editJob(jobData)
        setUpdated(true)
        getJob()
    }
    const { name, title, description, tasks, url, user_id } = apiJobData

    return(
        <React.Fragment>
            {apiJobData &&
                <div>
                    <div>
                        <h1> {name}: {title}</h1>
                        <h2> {description} </h2>
                        <h2> {tasks} </h2>
                        <h2> {url} </h2>

                    </div>
                    {errors &&
                        <p> {errors} </p>
                    }
                    {deleted &&
                        <Redirect to= '/careermainpage' />
                    }
                    {clicked &&
                        <div>
                            <br></br>
                               <div>
                                    <label>Name:</label>
                                    <input
                                      type="text"
                                      name="name"
                                      onChange={handleChange}
                                      value={jobData.name}
                                    />
                               </div>
                                <div>
                                    <label>Title</label>
                                    <input
                                      type="text"
                                      name="title"
                                      onChange={handleChange}
                                      value={jobData.title}
                                    />
                                </div>

                                <div>
                                    <label>Description</label>
                                    <input
                                      type="text"
                                      name="description"
                                      onChange={handleChange}
                                      value={jobData.description}
                                    />
                                </div>

                                <div>
                                    <label>URL</label>
                                    <input
                                      type="text"
                                      name="url"
                                      onChange={handleChange}
                                      value={jobData.url}
                                    />
                                </div>
                                <button variant="primary" onClick={() => handleEditClick(id)}>
                                Edit New Listing
                                </button>

                            </div>
                    }
                    {updated &&
                        <Redirect to='/careermainpage' />
                    }

                    <button onClick = {() => deleteJob(id)}>Delete</button>
                    <button onClick = {() => handleClick()}>Edit</button>
                </div>
            }
        </React.Fragment>

    )

}

export default ShowCurrentJob
