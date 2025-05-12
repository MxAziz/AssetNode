import { FaHashnode } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, signOutUser, loading } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return (
    <div>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
  if (isError) return <div>Error: {error.message}</div>;


  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
        toast.success("Sign out successful");
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };


  const handleActive = ({ isActive }) =>
  isActive
    ? " text-white bg-[#2F4749] hover:bg-[#F7C99B] hover:text-black"
    : " hover:text-[#2F4749]";


  // navbar links
  const links = (
    <>
      <li>
        <NavLink className={handleActive} to={"/"}>Home</NavLink>
      </li>
      {user ? (
        <>
          {data?.role === "employee" && (
            <>
              <li>
                <NavLink  to="/myAssets" className={handleActive}>
                  My Assets
                </NavLink>
              </li>
              <li>
                <NavLink to="/myTeam" className={handleActive}>
                  My Team
                </NavLink>
              </li>
              <li>
                <NavLink to="/requestAsset" className={handleActive}>
                  Request for an Asset
                </NavLink>
              </li>
            </>
          )}

          {data.role === "hr" && (
            <>
              <li>
                <NavLink className={handleActive} to={"/assetList"}>Asset List</NavLink>
              </li>
              <li>
                <NavLink className={handleActive} to={"/addAsset"}> Add an Asset</NavLink>
              </li>
              <li>
                <NavLink className={handleActive} to={"/allRequest"}>All Request </NavLink>
              </li>
              <li>
                <NavLink to={"/myEmployee"} className={handleActive}>My Employee List </NavLink>
              </li>
              <li>
                <NavLink to={"/addEmployee"} className={handleActive}>Add an Employee </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to={"/profile"} className={handleActive}>Profile</NavLink>
          </li>
          <li className="lg:hidden">
            <button onClick={handleLogOut}>Logout</button>
          </li>
          <li className="hidden lg:block">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="text" className=" m-1">
                <img
                  className="size-10 rounded-full"
                  src={
                    user.photoURL ||
                    "https://i.pinimg.com/474x/69/78/19/69781905dd57ba144ab71ca4271ab294.jpg"
                  }
                  alt=""
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#F7C99B] text-black rounded-box z-[1] w-56 shadow"
              >
                <li className=" text-base">
                  <a>{user?.displayName} </a>
                </li>
                <li>
                  <a>{user.email} </a>
                </li>
                <li>
                  <button className='bg-[#2F4749] text-white' onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"/joinEmployee"}>Join as Employee</NavLink>
          </li>
          <li>
            <NavLink to={"/joinHr"}>Join as HR Manager</NavLink>
          </li>
          <li>
            <NavLink
              className="btn btn-sm px-6 btn-outline  text-white bg-[#2F4749] hover:bg-[#F7C99B] hover:text-black border-0"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
        </>
      )}

    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 w-[97%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <h2>AssetNode</h2>
              <hr />
                {links}
            </ul>
          </div>
          <NavLink to={'/'} className=" text-xl flex items-center gap-1  font-semibold ">
            <FaHashnode  className='text-[#F7C99B] size-7'/>
            <strong className=' bg-gradient-to-r from-[#152d2f] to-[#f6c18beb] bg-clip-text text-transparent'>AssetNode</strong>
          </NavLink>
        </div>
        <div className="navbar-end hidden w-full lg:flex">
          <ul className="menu menu-horizontal flex justify-center items-center">
            {links}
          </ul>
        </div>
              <div className="navbar-center hidden">
              </div>
      </div>
    </div>
  );
};

export default Navbar;