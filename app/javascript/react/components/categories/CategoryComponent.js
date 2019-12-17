import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';
import { getJobs } from "../../api/jobs/jobs-api"
import JobCardComponent from "./JobCardComponent"

function CategoryComponent(props) { // this should be called JobCard component

    const { title, description, id, index, apiJobsData, handleReload} = props // we have the apiJ

    const displayJobs = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, description, tasks, url, user_id, id, category } = jobObj

        return(
            <div key={index}>
                {category == title &&

                    <JobCardComponent
                        jobObj={jobObj}
                        handleReload={handleReload}
                        />
                }
            </div>
        )
    })

    return (
        <div className='jumbotron' id = {id} key = {index} style ={{ width: '22%', verticalAlign: 'top', display: 'inline-block', marginRight: '2.5em', padding: '0.7em'}}>
              <h1 className="display-3" style = {{ textAlign: 'center', fontSize: '200%'}}><u>{title}</u></h1>
              <p className="lead" style={{textAlign: 'center', opacity: 0.6}}>{description}</p>
              <hr className="my-4" />
              {displayJobs}
        </div>
    )
}

export default CategoryComponent
