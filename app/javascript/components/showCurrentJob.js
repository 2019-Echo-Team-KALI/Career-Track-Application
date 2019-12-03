import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


function showCurrentJob() {

    function getCurrentJob() {
        return fetch('/jobs')
            .then( resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    return Promise.new(() => {
                        resolve({error: 'there was an error'})
                    })
                }
            })
    }
}

export default ShowCurrentJob
