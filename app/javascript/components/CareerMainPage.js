import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


function CareerMainPage(props) {

    const {current_user_id, getJob} = props
    const [ errors, setErrors ] = useState(null)
    const [ apiJobsData, setApiJobsData ] = useState([])

    function loadJobs(){
        getJob()
            .then(jobs => {
                if(jobs.errors) {
                    setErrors(jobs.errors)
                }
                setApiJobsData(jobs)
            })
    }

    useEffect(() => {
        loadJobs()
    },[])


    const displayJobs = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj

            if(current_user_id === user_id) {
                return(
                    <div key={index} >
                        <Link to={`/jobs/${id}`}>
                            <div style = {{borderStyle: 'inset'}}>
                                <h1> {name}: {title}</h1>
                                <h2> {description} </h2>
                                <h2> {tasks} </h2>
                                <h2> {url} </h2>
                            </div>
                        </Link>
                    </div>
                )
            }
    })

    return (
      <React.Fragment>
        {displayJobs}
      </React.Fragment>
    );

}

export default CareerMainPage
