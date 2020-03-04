import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { Accordion, Card, Button, Toast, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import MainTaskComponent from "./MainTaskComponent"
import { useState, useEffect } from 'react'


function MainTaskList(props) { // this is being called from the App.js
    const { current_user_id, apiTasksData, apiJobsData } = props

    const taskList = apiTasksData.reverse().map((task, index) => {
        const {description, job_id, user_id, title, id} = task // we need the job id to compare
        return(
            <MainTaskComponent
                index={index}
                apiJobsData={apiJobsData}
                description={description}
                job_id={job_id}
                title={title}
                key={index}
            />
        )
    })

    return(
      <div>
        {taskList}
      </div>

    )
}

export default MainTaskList
