import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="text-center">
        <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl  mb-6">
          Oops! The page you're looking for doesn't exist.
        </h2>
        <p className=" mb-8">
          It seems like you've lost your way. Let's get you back home!
        </p>
        <Link
          to="/"
          className="btn bg-[#2F4749] hover:bg-[#F7C99B]  text-white hover:text-black  flex items-center justify-center gap-2"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
