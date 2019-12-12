import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { Form, ButtonToolbar, Button } from 'react-bootstrap'

import { getTasks } from "../../api/tasks/tasks-api"
import EditTaskComponent from "../../components/EditTaskComponent"


function EditTaskPage(props) {
    const {paramJobId} = useParams() // we can use this to grab the tasks for the job
    const [ apiTasksData, setApiTasksData ] = useState([])
    const [goBack, setGoBack] = useState(false)

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
    },[])
    // taskSuccess we need this so it can reload

    const currentJobTasks = apiTasksData.map((task, index) => {
        const {id, name, job_id, description} = task

        return (
            <div key={index}>
                {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
                {job_id == paramJobId &&
                <EditTaskComponent
                    id={id}
                    name={name}
                    job_id={job_id}
                    description={description}
                />
                }
            </div>
        )
    })

    function handleBack() {
        console.log("back edit")
        setGoBack(true)
    }

    return (
        <div>
            <h1> Edit Task page for Job # {paramJobId} </h1>
            <h1> Current Tasks  </h1>
             {currentJobTasks}
             <Button
                 className="centerbutton"
                 onClick={handleBack}
             >
                 Back
             </Button>

             {goBack &&
                 <Redirect to={`/jobs/${paramJobId}`}/>
             }
        </div>
    )
}

export default EditTaskPage
