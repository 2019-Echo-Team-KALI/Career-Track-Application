import React from "react"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import "bootswatch/dist/lux/bootstrap.min.css";
import { Form, Col, Button } from 'react-bootstrap'


function CreateJob(){
    const [jobSuccess, setJobSuccess] = useState(false)

    const [ jobData, setJobData ] = useState(
        {
            name: '',
            title: '',
            description: '',
            url: '',
            catagory: 0
        }
    )

    // function createJob(job) {
    //     return fetch('/jobs', {
    //         body: JSON.stringify(job),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'POST'
    //     })
    //     .then( resp => {
    //         let json = resp.json()
    //         return json
    //     })
    // }

    // function handleChange(event) {
    //     const newJobData = {...jobData, [event.target.name]: event.target.value}
    //     setJobData(newJobData)
    // }
    //
    // function handleClick() {
    //     createJob(jobData)
    //     .then(() => {
    //         setJobSuccess(true)
    //     })
    // }

    return (
      <React.Fragment>
         <div>
            {/*
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
                     <label>Catagory</label>
                     <input
                       type="text"
                       name="url"
                       onChange={handleChange}
                       value={jobData.catagory}
                     />
                 </div>

                 <button variant="primary" onClick={handleClick}>
                 Create New Job
                 </button> */}

                 <br />
                 <br />
                 <Form>

                  <Form.Row>
                    <Form.Group as={Col} >
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group as={Col} >
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control  placeholder="Enter Title" />
                    </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label>Link</Form.Label>
                    <Form.Control  placeholder="Enter URL" />
                  </Form.Group>

                </Form.Row>

                  <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control placeholder="..." />
                  </Form.Group>


                  <Form.Group as={Col} >
                    <Form.Label>Catagory</Form.Label>
                    <Form.Control as="select">
                      <option>~</option>
                      <option>Applied</option>
                      <option>Wish List</option>
                    </Form.Control>
                  </Form.Group>

                </Form>
                <Button variant="primary" onClick={handleClick}>
                    Create New Job
                </Button>
                </div>

             {jobSuccess &&
                 <Redirect to="/addtask" />
             }
      </React.Fragment>
    );
}

export default CreateJob
