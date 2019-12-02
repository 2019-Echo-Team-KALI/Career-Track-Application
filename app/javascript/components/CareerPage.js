import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { useState } from 'react'

function CareerPage() {

    const [jobsData, setJobsData ] = useState(
        [
            {
                name: 'Gooooogle',
                title: 'dev',
                description: 'makin shit',
                tasks: [{
                    description: '',
                    job_id: 1,
                }],
                url: 'google.google',
                id: 1
            },
            {
                name: 'Facebook',
                title: 'dev',
                description: 'makin stuff',
                tasks: [{
                    description: 'This is the task description',
                    job_id: 2,
                }],
                url: 'google.google',
                id: 2
            }
        ]
    )

    const displayJobs = jobsData.map((jobObj, index) => {

        const { name, title, description, tasks, url, id } = jobObj

        return(
            <div key={index}>
                <h1> {name}: {title}</h1>
                <h2> {description} </h2>
                <h2> {tasks.description} </h2>
                <h2> {url} </h2>
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
