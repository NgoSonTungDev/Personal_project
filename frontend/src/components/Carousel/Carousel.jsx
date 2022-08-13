import React from "react";
import Carousel from "react-bootstrap/Carousel";
import dataCarousel from "./data";
import "./Carousel.scss";

const CarouselHome = () => {
  return (
    <div>
      <div className="Container_carousel_home">
        <Carousel variant="dark">
          {dataCarousel.map((item) => (
            <Carousel.Item >
              <img className="carousel_item_img" src={item.img} />
              <Carousel.Caption>
                <h5>{item.name}</h5>
                <p>{item.intro}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselHome;
