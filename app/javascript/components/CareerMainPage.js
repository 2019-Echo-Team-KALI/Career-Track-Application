import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import MainTaskList from './pages/tasks/tasklist/MainTaskList'
import arvin from './arvinlleva.jpg'


import { Accordion, Card, Button, Navbar, Nav, ListGroup, ListGroupItem, CardGroup  } from 'react-bootstrap'
import google_logo from './google_logo.png'
import facebook_logo from './facebook_logo.png'
import { useState, useEffect } from 'react'


function CareerMainPage(props) {

    const {current_user_id, loadJobs, loadTasks, apiJobsData ,apiTasksData} = props

    const [ logo, setLogo ] = useState({
      google: google_logo,
      facebook: facebook_logo,
      arvin: arvin
    })

    useEffect(() => { // we need lifecycle hook here to reload the data whenever we create a page, we may need to rename the load functions to make things easier
        // the load functions set the data
        loadJobs()
        loadTasks()
    },[])


    const displayJobs = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj


                return(
                    <div key={index} >
                        <Link to={`/jobs/${id}`}>
                            <div style = {{borderStyle: 'inset'}}>
                                <h1> Name: {name} - Title: {title}</h1>
                            </div>
                        </Link>



                    </div>
                )

    })

    const displayJobs2 = [...apiJobsData].reverse().map((jobObj, index) => {

        const { name, title, description, tasks, url, user_id, id } = jobObj


                return(
                        <div className="card mb-3" style= {{width: '22%', display: 'inline-block', marginLeft: '1em', marginRight: '1em'}} key={index}>

                        <Card style={{ width: '18rem' }}>
                          <Card.Body>
                            <Card.Title><a href={`/jobs/${id}`}><b>{name}</b></a></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
                            <Card.Text>
                              {description}
                            </Card.Text>
                            <Card.Footer>
                              <small className="text-muted" style={{borderStyle: 'edge'}}>{url}</small>
                            </Card.Footer>
                          </Card.Body>
                        </Card>

                        <Accordion defaultActiveKey="0" style={{ width: '18rem' }}>

                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Card.Header}   eventKey="1">
                                Task #1
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body>Information on task 1</Card.Body>
                            </Accordion.Collapse>
                          </Card>

                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Card.Header}   eventKey="2">
                                Task #2
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                              <Card.Body>Information on Task 2</Card.Body>
                            </Accordion.Collapse>
                          </Card>

                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Card.Header}   eventKey="3">
                                Task #3
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="3">
                              <Card.Body>Here is a longer statement so that we can test what will happen to the card when there is more text</Card.Body>
                            </Accordion.Collapse>
                          </Card>

                        </Accordion>

                        </div>
                )
    })



    return (
      <React.Fragment>

          <div style={{borderStyle: 'edge', width: '82em', float: 'right', marginTop: '1em'}}>
          {/*<MainTaskList

              apiTasksData={apiTasksData}
              apiJobsData={apiJobsData}
              current_user_id={current_user_id}
              />

          <br />

          {/*<ul className="nav nav-tabs" style={{marginLeft: '28em'}}>
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " data-toggle="tab" href="#applied">Applied</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#wishList">Wish List</a>
            </li>

          </ul>*/}


          <Nav fill variant="tabs" defaultActiveKey="#applied" style={{border: '1px solid rgba(0, 0, 0, .2)', marginRight: '1.7em', }}>
            <Nav.Item>
              <Nav.Link href="#applied">Applied</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#wishList'>Wish List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#moreInfo'>Get More Info</Nav.Link>
            </Nav.Item>

          </Nav>


          <div id='applied' className="tab-content" style={{display: 'inline-block', marginRight: '1.7em'}}>

            <div>
              <div className="jumbotron">
                <h1 className="display-3" style = {{marginTop: '-0.6em'}}>Applied</h1>
                <p className="lead"> You have applied to these jobs</p>
                <hr className="my-4" />
                {displayJobs2}
              </div>
            </div>
          </div>

          <div id='wishList' className="tab-content" style={{display: 'inline-block', marginRight: '1.7em'}}>
            <div >
              <div className="jumbotron">
                <h1 className="display-3" style = {{marginTop: '-0.6em'}}>Wish List</h1>
                <p className="lead"> This is your wish list for jobs</p>
                <hr className="my-4" />
                {displayJobs2}
              </div>
            </div>
          </div>

          <div id="moreInfo" className="tab-content" style={{display: 'inline-block', marginRight: '1.7em'}}>
            <div >
              <div className="jumbotron">
                <h1 className="display-3" style = {{marginTop: '-0.6em'}}>Get More Information</h1>
                <p className="lead">Look up more information on these companies to do well on the interview </p>
                <hr className="my-4" />
                {displayJobs2}
              </div>
            </div>
          </div>


          <br></br>
          <br></br>
          </div>
          <Card style={{ width: '18rem', position: 'sticky',  display: 'inline-block', marginLeft: '2.5em', marginTop: '4.3em'}}>
            <Card.Img variant="top" src={logo.arvin} style={{borderRadius: '7%'}}/>
            <Card.Body>
              <Card.Title>Arvin</Card.Title>
              <Card.Text>
                Hi I am Arvin and this is my description section where I get to tell you all about me!!
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Apply to job</ListGroupItem>
              <ListGroupItem>Apply to this one too </ListGroupItem>
              <ListGroupItem>here is another task that is hardcoded </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Random Link 1</Card.Link>
              <Card.Link href="#">Random Link2</Card.Link>
            </Card.Body>
          </Card>
      </React.Fragment>
    );

}

export default CareerMainPage



// <div className="card mb-3" style= {{width: '22%', display: 'inline-block', marginLeft: '2em'}} key={index}>
//   <a href={`/jobs/${id}`} >
//     <h3 className="card-header">{name}</h3>
//   </a>
//   <div className="card-body">
//     <h5 className="card-title">{title}</h5>
//     <h6 className="card-subtitle text-muted">{url}</h6>
//   </div>
//   {/*<img style={{height: '200px', width: '100%', display: 'block'}}  alt="Card image" src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"/>
//   <div className="card-body">
//     <p className="card-text">{description}</p>
//   </div>
