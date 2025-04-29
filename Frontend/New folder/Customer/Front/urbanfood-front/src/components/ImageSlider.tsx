import React from "react";
import { Carousel } from "react-bootstrap";
import "../css/ImageSlider.css";

import img1 from "../assets/slider/slider1.jpg";
import img2 from "../assets/slider/slider2.jpg";
import img3 from "../assets/slider/slider3.jpg";
import img4 from "../assets/slider/slider4.jpg";
import img5 from "../assets/slider/slider5.jpg";
import img6 from "../assets/slider/slider6.jpg";
import img7 from "../assets/slider/slider7.jpg";
import img8 from "../assets/slider/slider8.jpg";
import img9 from "../assets/slider/slider9.jpg";
import img10 from "../assets/slider/slider10.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

function ImageSlider() {
  return (
    <Carousel controls={false} indicators={false} interval={4000} fade>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="slider-image" src={image} alt={`Slide ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
