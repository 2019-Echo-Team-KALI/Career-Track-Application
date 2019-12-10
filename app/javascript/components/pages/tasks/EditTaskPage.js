import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, ButtonToolbar, Button } from 'react-bootstrap'

function EditTaskPage(props) {
    const {paramJobId} = useParams()

    return (
        <h1> Edit Task page for Job # {paramJobId} </h1>
    )
}

export default EditTaskPage
