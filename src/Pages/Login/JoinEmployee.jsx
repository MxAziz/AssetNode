import { Helmet } from 'react-helmet';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JoinEmployee = () => {

  const { signInWithGoogle, createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Regular expression:
  const passwordReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/;


    const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const photo = e.target.photo.value;
      const password = e.target.password.value;
      const birth = e.target.dob.value;
    console.log(name, email, password,photo, birth);

    // update user profile
    const profile = {
      name: name,
      photo: photo,
      email: email,
      birth:birth,
      role: "employee",
    };

    // password validation
    if (!passwordReg.test(password)) {
      toast.error(
        "Password Must have an Uppercase, a Lowercase, one digit and Length must be at least 6 characters"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        updateUserProfile(name, photo)
          .then(() => {
            axiosPublic.post("/users", profile).then((res) => {
              if (res.data.insertedId) {
                e.target.reset();
                toast.success("As a new employee, you are successfully registered!");
                navigate("/");
              }
            });
          })
          .catch((error) => console.log("user profile update error", error));
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }

    // google sign in function
    const handleGoogleSignIn = () => {
          signInWithGoogle()
      .then((result) => {
        const { displayName, email, photoURL } = result.user;

        // User data to save in MongoDB
        const userData = {
          name: displayName,
          email,
          photo: photoURL,
          role: "employee",
        };

        // Send user data to server
        axiosPublic.post("/users", userData).then((res) => {
          if (res.data.insertedId) {
            toast.success(
              "Sign up with Google is successful and user is saved!"
            );
            navigate("/");
          } else {
            toast.info("Sign up with Google is successful and user info is not saved!");
            navigate('/')
          }
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
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