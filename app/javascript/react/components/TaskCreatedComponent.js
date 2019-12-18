import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button, ListGroup, ListGroupItem, Jumbotron } from 'react-bootstrap'
import AddToCalendar from 'react-add-to-calendar';

function TaskCreatedComponent({title, description, job_id, paramJobId, modifiedTask, display_add_to_calendar}) {

    return (
        <div style={{}}>
            {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
            {job_id == paramJobId &&
            <div>
            <ListGroupItem>Task: {title} </ListGroupItem>
            {display_add_to_calendar &&
            <div style={{display: "flex",
            alignItems: "center",
            justifyContent: "center" ,
            textAlign: 'center'}}>
                <Button variant="light" style={{display: "flex",
                    alignItems: "center",
                    justifyContent: "center" ,
                    textAlign: 'center'}}>
                    <AddToCalendar event={modifiedTask} />
                </Button>

            </div>
            }
            </div>
            }
        </div>
    )





}

export default TaskCreatedComponent
