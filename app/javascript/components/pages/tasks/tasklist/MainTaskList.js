import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function MainTaskList(props) {
    const { apiTasksData, apiJobsData} = props

    // const {apiJobsData}


    const taskList = apiTasksData.map((task, index) => {
        const {description, job_id} = task // we need the job id to compare
        return(
            <div key={index} style = {{borderStyle: 'inset'}}>
                <h1> description: {description}</h1>
            </div>
        )
    })

    return(
        <div style = {{borderStyle: 'inset'}}>
            <h1> Main Task List </h1>
            {taskList}
        </div>
    )
}

export default MainTaskList

// {
//     description: "Task1 for job 1 User 1",
//     job_id: 1
// },
