import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Context } from "../../context/Context"


function AddTask(props) { // this should be called JobCard component
    const {test} = useContext(Context) // this grabs the test value

    return (
        <div>
            <h1> The string value below comes from the Context: </h1>
            <h1>{test}</h1>
        </div>
    )
}

export default AddTask
