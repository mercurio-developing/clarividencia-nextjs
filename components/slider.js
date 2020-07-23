import React from "react";
import Slider from "react-slick";


export default function GallerySlider({ photos,index }) {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide:index
  };
  return (
    <Slider {...settings}>
      {
        photos.map((photo,index) =>
            <img key={index} className="img-fluid " src={photo} alt="" />
        )
      }
    </Slider>
  );
}
