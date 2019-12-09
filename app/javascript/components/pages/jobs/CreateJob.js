import React from "react"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import "bootswatch/dist/lux/bootstrap.min.css";


function CreateJob(){
    const [jobSuccess, setJobSuccess] = useState(false)
    const [goBack, setGoBack] = useState(false)
    const [currentJobId, setCurrentJobId] = useState()
    const [ jobData, setJobData ] = useState(
        {
            name: '',
            title: '',
            description: '',
            url: '',
            category: 0
        }
    )

    function createJob(job) {
        return fetch('/jobs', {
            body: JSON.stringify(job),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then( resp => {
            let json = resp.json()
            // this helped us understand more about what is being fetch
            console.log("resp", resp)
            console.log("json", json)
            console.log("id", json.id)
            return json
        })
        .then(data => {
            // we're able to get the payload id once the job is created
            // here's a link to show the https://stackoverflow.com/questions/28916710/what-do-double-brackets-mean-in-javascript-and-how-to-access-them
            console.log("data's id", typeof data.id, data.id)
            setCurrentJobId(data.id)
        })
    }


    function handleChange(event) {
        const newJobData = {...jobData, [event.target.name]: event.target.value}
        setJobData(newJobData)
    }

    function handleClick() {
        createJob(jobData)
        .then(() => {

            setJobSuccess(true)
        })
    }

    function handleBack() {
        setGoBack(true)
    }

    return (
      <React.Fragment>
         <div>
             <br></br>
                <div>
                     <label>Name:</label>
                     <input
                       type="text"
                       name="name"
                       onChange={handleChange}
                       value={jobData.name}
                     />
                </div>
                 <div>
                     <label>Title</label>
                     <input
                       type="text"
                       name="title"
                       onChange={handleChange}
                       value={jobData.title}
                     />
                 </div>

                 <div>
                     <label>Description</label>
                     <input
                       type="text"
                       name="description"
                       onChange={handleChange}
                       value={jobData.description}
                     />
                 </div>

                 <div>
                     <label>URL</label>
                     <input
                       type="text"
                       name="url"
                       onChange={handleChange}
                       value={jobData.url}
                     />
                 </div>

                 <div>
                     <label>Category</label>
                     <input
                       type="text"
                       name="category"
                       onChange={handleChange}
                       value={jobData.category}
                     />
                 </div>

                 <button variant="primary" onClick={handleBack}>
                 Back to Career Page
                 </button>

                 <button variant="primary" onClick={handleClick}>
                 Create New Job
                 </button>

             </div>

             {jobSuccess &&
                <Redirect to={`/jobs/${currentJobId}/addtask`} />
             }
             {goBack &&
                 <Redirect to="/careermainpage"/>
             }
      </React.Fragment>
    );
}

export default CreateJob
