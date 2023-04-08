import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainGamePage } from "../Pages/MainGamePage";
import Signup from "./Signup";
import Login from "./Login";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainGamePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
