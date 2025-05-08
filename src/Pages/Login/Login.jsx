import React from 'react';
import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {

    const handleLogin = (e) => {
        e.preventDefault();

    }

    // google sign in function
    const handleGoogleSignIn = () => {
        // Implement Google sign-in logic here
    }

    return (
      <div className="bg-gradient-to-t from-[#e5c6a7] to-[#2F4749]  ">
        <div className="pt-[110px] pb-16 w-2/3 mx-auto flex">
          <Helmet>
            <title>Login - AssetNode</title>
          </Helmet>
          {/* image */}
          <figure className="hidden lg:block">
            <img
              className=" h-[510px] w-[450px] shadow-2xl"
              src="https://i.pinimg.com/736x/54/b9/ef/54b9ef6848259e884dee8a3744706439.jpg"
              alt=""
            />
          </figure>
          {/* login form */}
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body ">
              <div className="flex flex-col items-center">
                <h3 className="text-xl mt-2">Welcome Back !</h3>
                <button
                  onClick={handleGoogleSignIn}
                  className="btn mt-3 w-full flex items-center justify-center gap-2 bg-white  border border-gray-400 rounded-lg px-4 py-2 "
                >
                  <FcGoogle className="size-5" />
                  Login in with Google
                </button>
              </div>
              <div className="divider text-xs hover:underline">
                Or Login with Email
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered border-black focus:border-none w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered border-black focus:border-none w-full"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn text-white bg-[#2F4749] hover:bg-[#F7C99B] hover:text-black border-0 w-full ">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;