import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


function CareerPage() {

    const [ errors, setErrors ] = useState(null)
    const [ apiJobData, setApiJobData ] = useState([])

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



    function loadJobs(){
        getJob()
            .then(jobs => {
                if(jobs.errors) {
                    setErrors(jobs.errors)
                }
                setApiJobData(jobs)
            })
    }

    useEffect(() => {
        loadJobs()
    },[])


    const displayJobs = apiJobData.map((jobObj, index) => {

        const { name, title, description, tasks, url, id } = jobObj

        return(
            <div key={index}>
                <h1> {name}: {title}</h1>
                <h2> {description} </h2>
                <h2> {tasks} </h2>
                <h2> {url} </h2>
                <h2> {id} </h2>
            </div>
        )
    })

    return (
      <React.Fragment>
        {displayJobs}
      </React.Fragment>
    );

}

export default CareerPage
