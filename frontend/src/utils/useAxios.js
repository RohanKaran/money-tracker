import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { baseURL } from "./constants";

const useAxios = () => {
  const { authTokens } = useContext(AuthContext);

  // axiosInstance.interceptors.request.use(async (req) => {
  // 	return req;
  // });

  return axios.create({
    baseURL,
    headers: { Authorization: `Token ${authTokens?.token}` },
  });
};

export default useAxios;
