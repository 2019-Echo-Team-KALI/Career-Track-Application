import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { useState, useEffect, useParams } from 'react'


function ShowCurrentJob(props) {

    const {id} = useParams()

    const jobData = {
        name:"Google",
        title: "Developer",
        description: "Front End",
        url: "Google.com",
        id: 1,
        tasks: [
            {
                description : "Apply",
                id: 1
            },
            {
                description : "Follow up",
                id: 2
            }
        ]
    }

    // function getCurrentJob() {
    //     return fetch(`/jobs/${id}`)
    //         .then( resp => {
    //             if (resp.status === 200) {
    //                 return resp.json()
    //             } else {
    //                 return Promise.new(() => {
    //                     resolve({error: 'there was an error'})
    //                 })
    //             }
    //         })
    // }
    return(
        <div>
            <h1> test {id } </h1>
        </div>
    )

}

export default ShowCurrentJob
