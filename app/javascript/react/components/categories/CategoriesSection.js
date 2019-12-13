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
            jobs: []
        },
        {
            title: 'Applied',
            id: 1,
            jobs: []
        },
        {
            title: 'Interview',
            id: 2,
            jobs: []
        },
        {
            title: 'Offer/Rejected',
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
        <div>
            {displayCategories}
        </div>
    )
}

export default CategoriesSection
