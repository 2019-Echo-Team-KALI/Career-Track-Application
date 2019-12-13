import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';
import { getJobs } from "../../api/jobs/jobs-api"
import JobCardComponent from "./JobCardComponent"

function CategoryComponent(props) { // this should be called JobCard component

    const { title, description, id, index, apiJobsData} = props // we have the apiJ

    const displayJobs = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj

        return(
            <JobCardComponent
                jobObj={jobObj}
                key={index}
            />
        )
    })

    return (
        <div className='jumbotron' id={id}>

            <h1 className="display-3" style = {{marginTop: '-0.6em'}}>{title}</h1>
        {/* <p className="lead" style={{marginLeft:'5em'}}>{description}</p> */}
            <hr className="my-4" />
        {/* displayJobs2  this should be the job card*/}
        {displayJobs}
        </div>
    )
}

export default CategoryComponent
