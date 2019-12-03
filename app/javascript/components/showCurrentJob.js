import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { useState, useEffect, useParams } from 'react'


function ShowCurrentJob(props) {

    const {id} = useParams()
    const [ apiJobData, setApiJobData ] = useState([])
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

    const displayJob = apiJobData.map((jobObj, index) => {
        const { name, title, description, tasks, url, user_id, id } = jobObj

        return(
            <div key={index} style = {{borderStyle: 'inset'}}>
                <h1> {name}: {title}</h1>
                <h2> {description} </h2>
                <h2> {tasks} </h2>
                <h2> {url} </h2>
            </div>
        )
    })


    return(
        <React.Fragment>
            <div>
                test
            </div>
        </React.Fragment>

    )

}

export default ShowCurrentJob
