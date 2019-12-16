import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import arvin from '../images/arvinlleva.jpg'
import ProfileCard from '../components/ProfileCard'
import CategoriesSection from '../components/categories/CategoriesSection'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import google_logo from '../images/google_logo.png'
import facebook_logo from '../images/facebook_logo.png'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';

function MainCareerPage(props) {

    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData, getTask } = props

    useEffect(() => { // we need lifecycle hook here to reload the data whenever we create a page, we may need to rename the load functions to make things easier
        // the load functions set the data
        loadJobs()
        loadTasks()
    },[])

    return (
      <React.Fragment>



            <CategoriesSection
              apiJobsData={apiJobsData}
            />


          <br></br>
          <br></br>


          <ProfileCard
            current_user_id={current_user_id}
            loadJobs = {loadJobs}
            loadTasks = {loadTasks}
            apiJobsData={apiJobsData}
            apiTasksData={apiTasksData}
            getTask = {getTask}
          />
      </React.Fragment>
    );

}

export default MainCareerPage
