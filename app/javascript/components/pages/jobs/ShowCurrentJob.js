import React from "react"
import PropTypes from "prop-types"
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


function ShowCurrentJob(props) {

    const {id} = useParams()
    const [ apiJobData, setApiJobData ] = useState({})
    const [ errors, setErrors ] = useState(null)


    function getCurrentJob() {
        return fetch(`/jobs/${id}`)
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
                    <h1> {name}: {title}</h1>
                    <h2> {description} </h2>
                    <h2> {tasks} </h2>
                    <h2> {url} </h2>
                </div>
            }
        </React.Fragment>

    )

}

export default ShowCurrentJob
