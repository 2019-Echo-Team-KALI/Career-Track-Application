import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button } from 'react-bootstrap'

function EditTaskComponent(props) {
    const {id, name, job_id, description} = props

    return(
        <div>
            <h1>Task Component # {id}</h1>
            <h1>Description: {description} </h1>
        </div>
    )
}

export default EditTaskComponent
