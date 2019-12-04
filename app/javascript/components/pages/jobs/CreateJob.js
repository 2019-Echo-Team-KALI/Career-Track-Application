import React from "react"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateJob(){
    const [jobSucess, setJobSuccess] = useState(false)

    const [ jobData, setJobData ] = useState(
        {
            name: '',
            title: '',
            description: '',
            url: '',
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
            return json
        })
    }

    function handleChange(event) {
        const newJobData = {...jobData, [event.target.name]: event.target.value}
        setJobData(newJobData)
    }

    function handleClick() {
        createJob(jobData)
        setJobSuccess(true)
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

                 <button variant="primary" onClick={handleClick}>
                 Create New User
                 </button>

             </div>
             {jobSucess &&
                 <Redirect to="/jobs" />
             }
      </React.Fragment>
    );
}

export default CreateJob
