import React from "react"
import PropTypes from "prop-types"
import Carousel from 'react-bootstrap/Carousel'
import { useState } from 'react'
import hero1 from '../images/hero1.jpg'
import hero2 from '../images/hero2.jpg'
import hero3 from '../images/hero3.jpg'

function HomeCarousel() {

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <Carousel interval={20000} activeIndex={index} direction={direction} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={hero1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={hero2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={hero3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel
