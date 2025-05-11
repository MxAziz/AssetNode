import React from "react";
import { FaRegLightbulb, FaUsers, FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100  py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl  font-bold mb-6  bg-gradient-to-r from-[#23494d] to-[#f6c18b] bg-clip-text text-transparent">About Us</h2>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to SmartAssetManager! Our platform helps HR Managers
          efficiently manage assets, monitor employee usage, and simplify
          operations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {/* card 1 */}
          <div className="p-6  bg-[#AEC4EB] shadow-lg rounded-lg flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
            <FaRegLightbulb className="text-4xl mb-4 text-yellow-300" />
            <h3 className="text-xl font-bold  mb-2">Innovative Solution</h3>
            <p className="text-gray-600">
              Streamline your asset management with our cutting-edge tools.
            </p>
          </div>
          {/* card 2 */}
          <div className="p-6 bg-[#DACAE5] shadow-lg rounded-lg flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
            <FaUsers className="text-4xl text-teal-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Employee Focused</h3>
            <p className="text-gray-600">
              Designed to improve efficiency for both managers and employees.
            </p>
          </div>
          {/* card 3 */}
          <div className="p-6 bg-[#f6d5d6] shadow-lg rounded-lg flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
            <FaCheckCircle className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Reliable Service</h3>
            <p className="text-gray-600">
              Trusted by organizations for seamless asset tracking.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;