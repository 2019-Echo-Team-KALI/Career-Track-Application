import React from "react"
import PropTypes from "prop-types"
import HomePage from './HomePage'
import CareerMainPage from './CareerMainPage'
import CreateJob from './pages/jobs/CreateJob'
import AddTask from './pages/jobs/AddTask'
import CurrentJobCard from './pages/jobs/CurrentJobCard'
import EditCurrentJob from './pages/jobs/EditCurrentJob'
import "bootswatch/dist/lux/bootstrap.min.css";


import { useState, useEffect } from 'react'

import Header from "./pages/Header"
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
                console.log("ALJ", jobs)
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
                            <CareerMainPage
                                current_user_id={current_user_id}
                                loadJobs = {loadJobs}
                                loadTasks = {loadTasks}
                                apiJobsData={apiJobsData}
                                apiTasksData={apiTasksData}
                             />
                             </Route>
                            <Route path="/careermainpage">

                                <CareerMainPage
                                    current_user_id={current_user_id}
                                    loadJobs = {loadJobs}
                                    loadTasks = {loadTasks}
                                    apiJobsData={apiJobsData}
                                    apiTasksData={apiTasksData}
                                 />
                            </Route>

                            {/* <Route exact path='/jobs/:id' >
                                <ShowCurrentJob
                                    getJobs={getJobs}
                                    loadJobs = {loadJobs}
                                />
                            </Route>
                            */}
                            <Route exact path="/jobs/edit/:paramEditId">
                                <EditCurrentJob
                                    apiJobsData={apiJobsData}
                                    loadJobs={loadJobs}
                                />
                            </Route>

                            <Route exact path="/createjob">
                                <CreateJob />
                            </Route>

                            <Route exact path="/addtask">
                                <AddTask />
                            </Route>

                            <Route exact path='/homepage'>
                              <HomePage />
                            </Route>

                            <Route exact path='/jobs/:paramJobId' >
                                <CurrentJobCard
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
