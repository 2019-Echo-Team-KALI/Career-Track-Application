import React from "react"
import PropTypes from "prop-types"
import HomePage from './pages/HomePage'
import MainCareerPage from './pages/MainCareerPage'
import CreateJobPage from './pages/jobs/CreateJobPage'
import CreateTaskPage from './pages/tasks/CreateTaskPage'
import CreateFirstTaskPage from './pages/tasks/CreateFirstTaskPage'
import EditTaskPage from './pages/tasks/EditTaskPage'
import CurrentJobPage from './pages/jobs/CurrentJobPage'
import EditJobPage from './pages/jobs/EditJobPage'


import { useState, useEffect } from 'react'

import Header from "./components/Header"
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom"

function App(props) {

    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      current_user_id
    } = props

    const [ errors, setErrors ] = useState(null)
    const [ apiJobsData, setApiJobsData ] = useState([])
    const [ apiTasksData, setApiTasksData ] = useState([])



    function getTask() {
        return fetch('/tasks')
            .then( resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    return Promise.new(() => {
                        resolve({error: 'there was an error'})
                    })
                }
            })
    }

    function getJobs() {
        return fetch('/jobs')
            .then( resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    return Promise.new(() => {
                        resolve({error: 'there was an error'})
                    })
                }
            })
    }


    function loadTasks(){
        getTask()
            .then(tasks => {
                if(tasks.errors) {
                    setErrors(tasks.errors)
                }
                setApiTasksData(tasks)
            })
    }

    function loadJobs(){
        getJobs()
            .then(jobs => {
                if(jobs.errors) {
                    setErrors(jobs.errors)
                }
                setApiJobsData(jobs)
            })
    }

    return (
        <Router>
          <React.Fragment>
            <Header
                logged_in={logged_in}
                sign_in_route={sign_in_route}
                sign_out_route={sign_out_route}
                current_user_id={current_user_id}
            />
                {!logged_in &&
                    <HomePage />
                }


                {logged_in &&
                    <div>
                        <Switch>

                            <Route exact path="/">
                            <MainCareerPage
                                current_user_id={current_user_id}
                                loadJobs = {loadJobs}
                                loadTasks = {loadTasks}
                                apiJobsData={apiJobsData}
                                apiTasksData={apiTasksData}
                                getTask = {getTask}
                             />
                             </Route>
                            <Route path="/maincareerpage">

                                <MainCareerPage
                                    current_user_id={current_user_id}
                                    loadJobs = {loadJobs}
                                    loadTasks = {loadTasks}
                                    apiJobsData={apiJobsData}
                                    apiTasksData={apiTasksData}
                                    getTask = {getTask}
                                 />
                            </Route>


                            <Route exact path="/jobs/edit/:paramEditId">
                                <EditJobPage
                                    apiJobsData={apiJobsData}
                                    loadJobs={loadJobs}
                                />
                            </Route>

                            <Route exact path="/createjobpage">
                                <CreateJobPage />
                            </Route>

                            <Route exact path="/jobs/:paramJobId/createfirsttaskpage">
                                <CreateFirstTaskPage
                                    loadJobs = {loadJobs}
                                    loadTasks = {loadTasks}
                                    apiJobsData={apiJobsData}
                                    apiTasksData={apiTasksData}
                                />
                            </Route>

                            <Route exact path="/jobs/:paramJobId/createtaskpage">
                                <CreateTaskPage
                                    loadJobs = {loadJobs}
                                    loadTasks = {loadTasks}
                                    apiJobsData={apiJobsData}
                                    apiTasksData={apiTasksData}
                                />
                            </Route>

                            <Route exact path='/jobs/:paramJobId/edittaskpage' >
                                <EditTaskPage />
                            </Route>

                            <Route exact path='/homepage'>
                              <HomePage />
                            </Route>

                            <Route exact path='/jobs/:paramJobId' >
                                <CurrentJobPage
                                    apiJobsData={apiJobsData}
                                    loadJobs={loadJobs}
                                    loadTasks={loadTasks}
                                    apiTasksData={apiTasksData}
                                />
                            </Route>
                        </Switch>
                    </div>
                }

          </React.Fragment>
      </Router>
    );

}

export default App
