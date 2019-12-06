import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import MainTaskList from './pages/tasks/tasklist/MainTaskList'

import { useState, useEffect } from 'react'


function CareerMainPage(props) {

    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData} = props


    useEffect(() => { // we need lifecycle hook here to reload the data whenever we create a page, we may need to rename the load functions to make things easier
        // the load functions set the data
        loadJobs()
        loadTasks()
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
      <h1> Main Careers Page </h1>
        <MainTaskList
            apiTasksData={apiTasksData}
            apiJobsData={apiJobsData}
            current_user_id={current_user_id}
        />
        <br></br>
        <br></br>
        {displayJobs}
      </React.Fragment>
    );

}

export default CareerMainPage
