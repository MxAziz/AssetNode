import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <span className="loading loading-bars loading-lg flex justify-center items-center min-h-screen mx-auto"></span>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;