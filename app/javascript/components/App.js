import React from "react"
import PropTypes from "prop-types"
import CareerMainPage from './CareerMainPage'
import CreateJob from './pages/jobs/CreateJob'
import ShowCurrentJob from './pages/jobs/ShowCurrentJob'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

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

    const [tasks, setTasks] = useState([
        {
            description: "Task1 for job 1 User 1",
            job_id: 1
        },
        {
            description: "Task2 for job 2 User 1",
            job_id: 2
        },
        {
            description: "Task2 for job 4 for User 2",
            job_id: 4
        },
    ])

    function getJob() {
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

    function loadJobs(){
        getJob()
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

                {logged_in &&
                    <div>
                        <Switch>
                            <Route exact path="/careermainpage">
                                <CareerMainPage
                                    current_user_id={current_user_id}
                                    getJob= {getJob}
                                    apiJobsData={apiJobsData}
                                    loadJobs={loadJobs}
                                    tasks={tasks}
                                 />
                            </Route>

                            <Route exact path='/jobs/:id' >
                                <ShowCurrentJob getJob={getJob} loadJobs = {loadJobs}/>
                            </Route>


                            <Route exact path="/createjob">
                                <CreateJob />
                            </Route>
                        </Switch>
                    </div>
                }


          </React.Fragment>
      </Router>
    );

}

export default App
