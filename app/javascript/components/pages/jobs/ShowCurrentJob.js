import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function ShowCurrentJob(props) {

    const {id} = useParams()
    const [ apiJobData, setApiJobData ] = useState({})
    const [ errors, setErrors ] = useState(null)
    const [ deleted, setDeleted ] = useState(false)


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

                    <button onClick = {() => deleteJob(id)}>Delete</button>
                </div>
            }
        </React.Fragment>

    )

}

export default ShowCurrentJob
