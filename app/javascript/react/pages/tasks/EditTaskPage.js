import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { Form, ButtonToolbar, Button } from 'react-bootstrap'
import {getJob} from "../../api/jobs/jobs-api"

import { getTasks } from "../../api/tasks/tasks-api"
import EditTaskComponent from "../../components/EditTaskComponent"


function EditTaskPage(props) {
    const {paramJobId} = useParams() // we can use this to grab the tasks for the job
    const [ apiTasksData, setApiTasksData ] = useState([])
    const [ goBack, setGoBack ] = useState(false)
    const [ reload, setReload ] = useState(false)
    const [jobOfTask, setJobOfTask] = useState({})
    const [ goAddTask, setGoAddTask] = useState(false)

    function loadTasks(){
        getTasks()
            .then(tasks => {
                if(tasks.errors) {
                    setErrors(tasks.errors)
                }
                console.log("App Tasks", tasks)
                setApiTasksData(tasks)
            })
    }
    useEffect(() => { // to constantly load the tasks
        loadTasks()
        loadJob()
    },[])
    // taskSuccess we need this so it can reload

    const currentJobTasks = apiTasksData.map((task, index) => {
        const {id, name, job_id, description} = task

        return (
            <div key={index}>
                {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
                {job_id == paramJobId &&
                <EditTaskComponent
                    handleReload={handleReload}
                    id={id}
                    name={name}
                    job_id={job_id}
                    description={description}
                />
                }
            </div>
        )
    })

    function handleReload() {
        console.log("back edit")
        loadTasks()
        setReload(true)
    }

    function handleBack() {
        console.log("back edit")
        setGoBack(true)

    }
    function handleGoAddTask() {
        setGoAddTask(true)
    }



    function loadJob(){
        getJob(paramJobId)
            .then(job => {
                if(job.errors) {
                    setErrors(job.errors)
                }
                setJobOfTask(job)
            })
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', marginTop: '2em', marginBottom: '-1.4em'}}><u> Edit Task Page for {jobOfTask.name}: {jobOfTask.title}</u></h1>
            <div style ={{marginBottom: '5%'}}> 
             {currentJobTasks}
            </div> 

            <div style ={{marginBottom: '2em', width: '60.4%', marginLeft: '20%', marginBottom: '15%'}}>
                <div style ={{float: 'left'}}>
                    <Button variant = 'dark' onClick={handleBack} style={{}} >
                        Back to Job Details
                    </Button>
                </div>

                <div style ={{float: 'right'}}>
                    <Button variant = 'dark' onClick={handleGoAddTask}>
                        Add Tasks
                    </Button>
                </div>
            </div>
            {goAddTask &&
                <Redirect to={`/jobs/${paramJobId}/createtaskpage`}/>

            }
             {reload &&
                 <Redirect to={`/jobs/${paramJobId}/edittaskpage`}/>
             }
             {goBack &&
                 <Redirect to={`/jobs/${paramJobId}`}/>
             }
        </div>
    )
}

export default EditTaskPage
