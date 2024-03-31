import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const fetchPostData = async (setUser, navigate) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get("http://localhost:3003/api/v1/profile", config);
    setUser(res.data.data);
    navigate("/");
  } catch (error) {
    console.log(error);
    navigate("/login");
  }
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
