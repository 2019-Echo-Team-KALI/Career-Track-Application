import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Sticky from 'react-sticky-el';

function JobCardComponent({jobObj}) { // this should be called JobCard component

    return (
        <div className="card mb-3" style= {{width: '22%', display: 'inline-block', marginLeft: '1em', marginRight: '1em', position: 'aboslute', zIndex: 1}}>

          <Card style={{zIndex: 1}}>
            <Card.Body>
              <Card.Title><a href={`/jobs/${jobObj.id}`}><b>{jobObj.name}</b></a></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{jobObj.title}</Card.Subtitle>
              <Card.Text>
                {jobObj.description}
              </Card.Text>
              <Card.Footer>
                <small className="text-muted" style={{borderStyle: 'edge'}}>{jobObj.url}</small>
              </Card.Footer>
            </Card.Body>
          </Card>

        </div>
    )
}

export default JobCardComponent
