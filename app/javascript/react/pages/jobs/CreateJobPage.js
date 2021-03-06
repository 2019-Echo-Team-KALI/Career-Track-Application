import React from "react"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { Redirect, useParams } from 'react-router-dom'
import { Form, ButtonToolbar, Button, DropdownButton, SplitButton, Dropdown } from 'react-bootstrap'


function CreateFirstTaskPage(){
    const [jobSuccess, setJobSuccess] = useState(false)
    const [goBack, setGoBack] = useState(false)
    const [currentJobId, setCurrentJobId] = useState()
    const { paramCategory } = useParams() 
    const [errorCheck, setErrorCheck] = useState(false) // this is if we want to have the validations be displayed on the page instead of an alert
    const [ jobData, setJobData ] = useState(
        {
            name: '',
            title: '',
            description: '',
            url: '',
            category: paramCategory
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
    }

    function handleClick() {
        if (!jobData.name || !jobData.title) {
            alert("Please enter a name and title")
        } else {
            createJob(jobData)
            .then(() => {

                setJobSuccess(true)
            })
        }
    }

    function handleBack() {
        setGoBack(true)
    }

    return (
      <React.Fragment>
         <div className="editorcreateforms">

            <Button variant = 'dark' onClick={handleBack} style={{marginLeft: '20%',marginTop: '2%'}}>Back To Dashboard</Button>

            <h1 style = {{marginBottom: '-4%'}}>Track A New Job</h1>

            <Form className = "formContainer">
              <Form.Group controlId="formGroupName">
                     <Form.Label>Company Name:</Form.Label>
                     <Form.Control
                       type="text"
                       name="name"
                       onChange={handleChange}
                       value={jobData.name}
                     />
                </Form.Group>

                 <Form.Group controlId="formGroupTitle">
                     <Form.Label>Position Title:</Form.Label>
                     <Form.Control
                       type="text"
                       name="title"
                       onChange={handleChange}
                       value={jobData.title}
                     />
                 </Form.Group>

                 <Form.Group>
                     <Form.Label>Job Description:</Form.Label>
                     <Form.Control
                       type="text"
                       name="description"
                       onChange={handleChange}
                       value={jobData.description}
                     />
                 </Form.Group>

                 <Form.Group>
                     <Form.Label>Job post URL:</Form.Label>
                     <Form.Control
                       type="text"
                       name="url"
                       onChange={handleChange}
                       value={jobData.url}
                     />
                 </Form.Group>

                 <Form.Group controlId="controlSelect1">
                    <Form.Label>Select Current Job Status:</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        onChange={handleChange}
                        value={jobData.category}
                    >
                      <option value='Wish List'>Wish List</option>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer|Rejected">Offer|Rejected</option>


                    </Form.Control>
                  </Form.Group>

                  <ButtonToolbar>
                    <Button variant = 'info' onClick={handleClick} style = {{marginLeft: '45%'}}>Save Job</Button>
                 </ButtonToolbar>
             </Form>
             </div>

             {jobSuccess &&
                <Redirect to={`/jobs/${currentJobId}/createfirsttaskpage`}/>
             }
             {goBack &&
                 <Redirect to="/maincareerpage"/>
             }
      </React.Fragment>
    );
}

export default CreateFirstTaskPage
