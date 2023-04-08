import React from "react";
import { Route, Routes } from "react-router-dom";
import {MainGamePage} from "../Pages/MainGamePage";
import Signup from "./Signup";
import Login from "./Login";
import UsersList from "./UsersList";
import SingleUserGame from "./SingleUserGame";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainGamePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userList" element={<UsersList />} />
        <Route path="/singleuser" element={<SingleUserGame />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
