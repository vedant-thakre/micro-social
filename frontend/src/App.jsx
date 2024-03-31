import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AppContext from "./context/appContext";
import CreatePost from "./components/Createpost";

const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<CreatePost />} />
    </Routes>
  );
};

export default App;
