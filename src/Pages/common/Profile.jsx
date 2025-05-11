import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const { user} = useAuth();
    return (
      <div className="pt-[50px] pb-10 bg-gradient-to-t from-[#f7c99bb1] to-[#2F4749] ">
        <div className="card bg-base-100  w-96 mx-auto shadow-xl">
          <div className=" min-h-[170px] bg-gradient-to-br bg-[#273d3f] from-[#f8d0a9c2] rounded-t-xl text-white ">
            <p className="font-semibold text-xl text-center mt-8">
              Welcome back to your profile
            </p>
          </div>
          <div className="flex flex-col justify-center items-center absolute left-32 top-28">
            <img className="size-28 rounded-full" src={user.photoURL} />
          </div>
          <div className="card-body pt-[70px] text-center">
            <h2 className="card-title mx-auto text-3xl font-bold">
              {user.displayName}
            </h2>
            <p className=" font-semibold">{user.email}</p>
            <div className="card-actions justify-center mt-1">
              <NavLink
                to={"/updateProfile"}
                className="py-3 rounded-md btn-wide text-white bg-[#2F4749] hover:bg-[#F7C99B] hover:text-black "
              >
                Update Profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;