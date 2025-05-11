import React from 'react';
import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const Login = () => {

 const { signInUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      // console.log(email, password);

      signInUser(email, password)
        .then((result) => {
          form.reset();
          navigate(from, { replace: true });
          toast.success("Login is successful");
        })
        .catch((error) => {
          toast.error("Invalid Email or Password");
        });

    }

    // google sign in function
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result.user?.photoURL,
          role: "employee",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
        navigate("/");
        toast.success("Google Sign-in successful!");
      })
      .catch((error) => {
        console.log("auth related error", error);
        toast.error("Google Sign-in failed!");
      });
    }

    return (
      <div className="bg-gradient-to-t from-[#f7c99be8] to-[#2F4749]  ">
        <div className="pt-[80px] pb-16 w-2/3 mx-auto flex">
          <Helmet>
            <title>Login - AssetNode</title>
          </Helmet>
          {/* image */}
          <figure className="hidden lg:block">
            <img
              className=" h-[510px] w-[450px] shadow-2xl rounded-l-lg"
              src="https://i.pinimg.com/736x/54/b9/ef/54b9ef6848259e884dee8a3744706439.jpg"
              alt=""
            />
          </figure>
          {/* login form */}
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-l-none">
            <form onSubmit={handleLogin} className="card-body ">
              <div className="flex flex-col items-center mt-8">
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
                  className="input input-bordered w-full border-black focus:outline-none"
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
                  className="input input-bordered w-full border-black focus:outline-none"
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