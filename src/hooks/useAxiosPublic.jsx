import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://sam000.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;