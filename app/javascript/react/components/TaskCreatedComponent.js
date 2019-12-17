import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button, ListGroup, ListGroupItem, Jumbotron } from 'react-bootstrap'
import AddToCalendar from 'react-add-to-calendar';

function TaskCreatedComponent({title, description, job_id, paramJobId, modifiedTask, displayCalendar}) {

    return (
        <div>
            {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
            {job_id == paramJobId &&
            <div>
            <ListGroupItem>Task: {title} </ListGroupItem>
            {displayCalendar &&
            <AddToCalendar event={modifiedTask} />
            }
            </div>
            }
        </div>
    )





}

export default TaskCreatedComponent
