import React from "react"
import PropTypes from "prop-types"
import { Link, useParams } from 'react-router-dom'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect, } from 'react'
import Sticky from 'react-sticky-el';
import { getJobs } from "../../api/jobs/jobs-api"
import JobCardComponent from "./JobCardComponent"

function CategoryComponent(props) { // this should be called JobCard component


    const { title, description, id, index, apiJobsData, handleReload} = props // we have the api
    

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
    {/* this is where the add button comes in */}
    <Link style ={{textAlign: 'center', width: '100%'}} to={`/createjobpage/${title}`}>  
              <Button  variant="outline-dark" style={{width: '100%', zIndex: 1, borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none'}}>
                  <Card.Title style ={{fontSize: '100%'}}> <i class="fas fa-plus fa-2x"></i> </Card.Title>
              </Button>

            </Link> 
              <hr className="my-4" />
              {displayJobs}
        </div>
    )
}

export default CategoryComponent
