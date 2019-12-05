import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import MainTaskList from './pages/tasks/tasklist/MainTaskList'

import { useState, useEffect } from 'react'


function CareerMainPage(props) {

    const {current_user_id, getJob, apiJobsData, loadJobs} = props


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
                                <h1> Name: {name} - Title: {title}</h1>
                            </div>
                        </Link>
                    </div>
                )
            }
    })

    return (
      <React.Fragment>
        <MainTaskList />
        {displayJobs}
      </React.Fragment>
    );

}

export default CareerMainPage
