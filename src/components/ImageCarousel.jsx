import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselData = [
  {
    id: 1,
    image: "/src/assets/img/slide1.png",
    link: "https://example.com/1",
    title: "Site 1"
  },
  {
    id: 2,
    image: "/src/assets/img/slide1.png",
    link: "https://example.com/2",
    title: "Site 2"
  },
  {
    id: 3,
    image: "/src/assets/img/slide1.png",
    link: "https://example.com/3",
    title: "Site 3"
  }
];

export default function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <Slider {...settings}>
        {carouselData.map((slide) => (
          <div key={slide.id} className="outline-none">
            <div
              className="relative cursor-pointer"
              onClick={() => handleClick(slide.link)}
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full  object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-semibold">
                  {slide.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}