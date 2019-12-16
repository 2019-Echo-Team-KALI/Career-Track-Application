import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';
import CategoryComponent from './CategoryComponent'

function CategoriesSection(props) { // this should be called JobCard component
    const { apiJobsData } = props

    const [ categories, setCategories ] = useState([
        {
            title: 'Wish List',
            id: 0,
            description: 'Your Wish List of jobs to apply for',
            jobs: []
        },
        {
            title: 'Applied',
            description: 'You have applied to these jobs',

            id: 1,
            jobs: []
        },
        {
            title: 'Interview',
            id: 2,
            description: 'Upcoming Interviews ',
            jobs: []
        },
        {
            title: 'Offer/Rejected',
            description: 'results',
            id: 3,
            jobs: []
        }
    ])

    const displayCategories = categories.map((categoryObj, index) => {
      const { title, description, id } = categoryObj
      /* here is where we wrap it into a the Droppable*/
      return (

         <CategoryComponent
            apiJobsData={apiJobsData}
            title={title}
            description={description}
            id={id}
            key={index}
         />
      )
    })

    return (
        <div style={{display: 'inline-block',  marginTop: '0.8%', marginRight: '1.7em', width: '98.3%'}}>
            {displayCategories}
        </div>
    )
}

export default CategoriesSection
