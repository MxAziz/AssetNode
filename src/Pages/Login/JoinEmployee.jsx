import React from 'react';
import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';

const JoinEmployee = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    // google sign in function
    const handleGoogleSignIn = () => {
        // Implement Google sign-in logic here
    }

    return (
            <div className="bg-gradient-to-t from-[#e5c6a7] to-[#2F4749] ">
      <div className="pt-[70px] pb-16 w-2/3 mx-auto flex flex-row-reverse">
        <Helmet>
          <title>JoinEmployee - AssetNode</title>
        </Helmet>
        {/* image */}
        <figure className="hidden lg:block">
          <img
            className=" h-full w-[450px] shadow-2xl rounded-r-lg"
            src="https://i.pinimg.com/736x/21/90/af/2190af9f526c96a4680d68335c9a3d25.jpg"
            alt=""
          />
        </figure>
        {/* login form */}
        <div className="card bg-base-100  w-full max-w-sm shrink-0 shadow-2xl rounded-r-none">
          <form onSubmit={handleSubmit} className="card-body ">
            <div className="flex flex-col items-center">
              <h3 className="text-xl mt-2">Get Your Free Account Now !</h3>
              <button
                onClick={handleGoogleSignIn}
                className="btn mt-3 w-full flex items-center justify-center gap-2  hover:bg-[#2F4749] hover:text-white border border-gray-400 rounded-lg px-4 py-2 "
              >
                <FcGoogle className="size-5" />
                SignUp with Google
              </button>
            </div>
            <div className="divider text-xs hover:underline">
              Or Registration with Email
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text ">
                  Your PhotoURL
                </span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Your PhotoURL"
                className="input input-bordered w-full focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered w-full focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="label-text ml-1 ">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn text-white bg-[#2F4749] hover:bg-[#F7C99B] hover:text-black border-0 w-full rounded-lg ">
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default JoinEmployee;