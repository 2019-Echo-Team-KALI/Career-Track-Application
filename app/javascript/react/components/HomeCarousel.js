import React from "react"
import PropTypes from "prop-types"
import Image from 'react-bootstrap/Image'
import { useState } from 'react'
import hero1 from '../images/hero1.jpg'

function HomeCarousel() {

  return (
    <div style= {{maxWidth: '65%', display: 'inlineBlock', float: 'left'}}>
    <img
          className="d-block w-100"
          src={hero1}
          alt="Welcome to Career Track! Career Track is a job hunt management software that helps job-seekers keep track of jobs as they navigate the job search"
          fluid
        />
    </div>
  );
}

export default HomeCarousel
