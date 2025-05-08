import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// CSS: Tailwind + DaisyUI
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-gray-100 overflow-hidden ">
      <Slider {...settings} className="">
        {/* Slider 1 */}
        <div className="relative">
          <img
            src="https://johpartners.com/wp-content/uploads/2024/10/Real-Estate-Asset-Manager-Do-JOH-Partners.webp"
            alt="HR Manager"
            className="w-full h-[500px] lg:h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
            <h2 className="text-4xl text-white font-bold mb-4">
              Join as HR Manager
            </h2>
            <Link
              to="/joinHr"
              className="btn px-6 font-bold text-lg bg-[#F7C99B] text-black hover:bg-[#2F4749] hover:text-white border-none"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Slider 2 */}
        <div className="relative">
          <img
            src="https://i.pinimg.com/736x/c5/a8/b2/c5a8b29b51c10dcc80df7ce018354241.jpg"
            alt="Employee"
            className="w-full h-[500px] lg:h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
            <h2 className="text-4xl text-white font-bold mb-4">
              Join as Employee
            </h2>
            <Link
              to="/joinEmployee"
              className="btn px-6 font-bold text-lg bg-[#F7C99B] text-black hover:bg-[#2F4749] hover:text-white border-none"
            >
              Join Now
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;