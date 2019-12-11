import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button } from 'react-bootstrap'


function EditJobPage({apiJobsData, loadJobs}) { // this is equivalent to const {apiJobsData, loadJobs} = props for decontructoring
    const { paramEditId } = useParams() // this will be used to get the current job that we want to edit
    const [goBack, setGoBack] = useState(false)
    const [goEdit, setGoEdit] = useState(false)
    const [editComplete, setEditComplete] = useState(false)
    const [ currentJob, setCurrentJob ] = useState({
        name: '',
        title: '',
        description: '',
        url: '',
    })

    useEffect(() => {
        loadJob()
    },[])

    function getJob() {
        return fetch(`/jobs/${paramEditId}`)
            .then( resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    return Promise.new(() => {   {/*need to fix this*/}
                        resolve({error: 'there was an error'})
                    })
                }
            })
    }

    function loadJob(){
        getJob()
            .then(job => {
                if(job.errors) {
                    setErrors(job.errors)
                }
                setCurrentJob(job)
            })
    }

    function editJob(job){
        return fetch(`/jobs/${paramEditId}`, {
            body: JSON.stringify(job),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
        })
        .then(resp => {
            if (resp.status === 200) {
                let json = resp.json()
                setEditComplete(true)
                return json
            } else {
                resp.json()
                .then(payload => {
                    setErrors(payload.error)
                })
            }
        })
    }

    const { name, title, description, tasks, url, user_id } = currentJob

    function handleFinishEdit() {
        console.log("Edit,", paramEditId)
        editJob(currentJob)
    }

    function handleBack() {
        setGoBack(true)
    }

    function handleChange(event) {
        const newJobData = {...currentJob, [event.target.name]: event.target.value}
        setCurrentJob(newJobData)
    }

    return(
        <React.Fragment>
            <div className="editorcreateforms">
                <h1>Edit Job Details</h1>
                <Form className = "formContainer">

                  <Form.Group controlId="formGroupName">
                    <Form.Label>Company Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={currentJob.name}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGroupTitle">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      onChange={handleChange}
                      value={currentJob.title}
                  />
                  </Form.Group>


                  <Form.Group controlId="formGroupUrl">
                    <Form.Label>URL:</Form.Label>
                    <Form.Control
                      type="text"
                      name="url"
                      onChange={handleChange}
                      value={currentJob.url}
                    />
                    </Form.Group>

                <Form.Group controlId="formGroupDescription">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={currentJob.description}
                  />
                </Form.Group>

            <ButtonToolbar className="formbuttons">
              <Button className="centerbutton" onClick={handleBack}>Go Back to Main Page</Button>
              <Button className="centerbutton" onClick={handleFinishEdit}>
                  Complete Edits
              </Button>
            </ButtonToolbar>
            </Form>
            {goBack &&
                <Redirect to={`/jobs/${paramEditId}`}/>
            }
            {editComplete &&
                <Redirect to={`/jobs/${paramEditId}`}/>
            }

        </div>
        </React.Fragment>
    )
}

export default EditJobPage
