import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../utils/constants";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [variant, setVariant] = useState(null);
  const [currentUser, setCurrentUser] = useState(() =>
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${baseURL}/user/login/`, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then(async (res) => {
        setAuthTokens({
          token: res.data.token,
        });
        localStorage.setItem(
          "authTokens",
          JSON.stringify({ token: res.data.token })
        );
        setCurrentUser(res.data.user);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setVariant("danger");
        setAlert("Invalid email or password!");
        setLoading(false);
        setTimeout(() => {
          setAlert(null);
        }, 2000);
        console.log(err);
      });
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setCurrentUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const contextData = {
    currentUser,
    setCurrentUser,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
    loading,
  };

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={contextData}>
      <div align="center">
        {alert ? <Alert variant={variant}>{alert}</Alert> : null}
      </div>
      {children}
    </AuthContext.Provider>
  );
}
