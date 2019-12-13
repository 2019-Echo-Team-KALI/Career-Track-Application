import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';

const JobCardComponent = ({jobObj}) => {


    return(
        <div className="card mb-3" >
          <Button href ={`/jobs/${jobObj.id}`} variant="outline-dark" style={{zIndex: 1, borderTop: 'none', borderRight: 'none', borderLeft: 'none'}}>
            <Card.Title >{jobObj.name}</Card.Title>
            <Card.Title style ={{fontSize: '65%'}}>{jobObj.title}</Card.Title>
              <Card.Footer>
                  <small  style={{borderStyle: 'edge', fontSize: '95%', textTransform: 'capitalize'}}>{jobObj.description}</small>
              </Card.Footer>
          </Button>
        </div>
    )
}

export default JobCardComponent
