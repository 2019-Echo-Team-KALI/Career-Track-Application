import React from "react"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import { Form, ButtonToolbar, Button, DropdownButton, SplitButton, Dropdown } from 'react-bootstrap'


function CreateJobPage(){
    const [jobSuccess, setJobSuccess] = useState(false)
    const [goBack, setGoBack] = useState(false)
    const [currentJobId, setCurrentJobId] = useState()
    const [ jobData, setJobData ] = useState(
        {
            name: '',
            title: '',
            description: '',
            url: '',
            category: ''
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
            console.log("data", data)
            setCurrentJobId(data.id)
        })
    }


    function handleChange(event) {
        const newJobData = {...jobData, [event.target.name]: event.target.value}
        setJobData(newJobData)
        console.log('category', jobData.category )
        console.log('name', jobData.name )

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
        <h1>{jobData.category}</h1>
         <div className="editorcreateforms">
            <h1>Create a New Job Listing</h1>
            <Form className = "formContainer">
              <Form.Group controlId="formGroupName">
                     <Form.Label>Name:</Form.Label>
                     <Form.Control
                       type="text"
                       name="name"
                       onChange={handleChange}
                       value={jobData.name}
                     />
                </Form.Group>

                 <Form.Group controlId="formGroupTitle">
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                       type="text"
                       name="title"
                       onChange={handleChange}
                       value={jobData.title}
                     />
                 </Form.Group>

                 <Form.Group>
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                       type="text"
                       name="description"
                       onChange={handleChange}
                       value={jobData.description}
                     />
                 </Form.Group>

                 <Form.Group>
                     <Form.Label>URL</Form.Label>
                     <Form.Control
                       type="text"
                       name="url"
                       onChange={handleChange}
                       value={jobData.url}
                     />
                 </Form.Group>

                 <Form.Group controlId="controlSelect1">
                    <Form.Label>Category Select:</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        onChange={handleChange}
                        value={jobData.category}
                    >
                      <option value='Wish List'>Wish List</option>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer/Rejected">Offer/Rejected</option>


                    </Form.Control>
                  </Form.Group>

                  <ButtonToolbar>
                    <Button variant = 'info' onClick={handleBack} style={{marginRight: '1em'}}>Go Back to Main Page</Button>
                    <Button variant = 'info' onClick={handleClick}>Create New Job</Button>
                 </ButtonToolbar>
             </Form>
             </div>

             {jobSuccess &&
                <Redirect to={`/jobs/${currentJobId}/createtaskpage`}/>
             }
             {goBack &&
                 <Redirect to="/maincareerpage"/>
             }
      </React.Fragment>
    );
}

export default CreateJobPage
