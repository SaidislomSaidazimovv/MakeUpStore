import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel: React.FC = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      <div>
        <img src="/images/imagecr1.jpg" alt="Image 1" />
      </div>
      <div>
        <img src="/images/imagecr2.jpg" alt="Image 2" />
      </div>
      <div>
        <img src="/images/imagecr3.jpg" alt="Image 3" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
