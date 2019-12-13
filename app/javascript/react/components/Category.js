import React from "react"
import PropTypes from "prop-types"
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import JobCard from './JobCard'

const Category = (props) => {
    
    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData, getTask} = props

    const [ category, setCategory ] = useState([
        {
        title: 'Applied',  
        description: 'You have applied to these jobs',
        id: 1
        }, 
        {
        title: 'Wish List', 
        description: 'Your Wish List of jobs to apply for',
        id: 2
        },    
        {
        title: 'Get Info', 
        description: 'Look up more info on these Companies',
        id: 3
        },
        {
          title: 'In Progress', 
          description: 'Waiting for a response from company',
          id: 3
          }
    ]) 

    const displayCategory = category.map((categoryObj, index) => {
        
        const { title, description, id } = categoryObj 
  
        return (
  
            <div className='jumbotron' id = {id} key = {index} style ={{ width: '22%', display: 'inline-block', marginRight: '2.5em', padding: '0.7em'}}>
              <h1 className="display-3" style = {{ textAlign: 'center', fontSize: '200%'}}><u>{title}</u></h1>
              <p className="lead" style={{textAlign: 'center', opacity: 0.6}}>{description}</p>
              <hr className="my-4" />

              <JobCard 
                current_user_id={current_user_id} 
                loadJobs = {loadJobs} 
                loadTasks = {loadTasks} 
                apiJobsData={apiJobsData}
                apiTasksData={apiTasksData}
                getTask = {getTask}
              /> 
            </div>
  
        )
      })


    return(
        <div style={{display: 'inline-block', marginRight: '1.7em', width: '98.3%'}}>
            {displayCategory}
        </div> 
    )
}

export default Category 