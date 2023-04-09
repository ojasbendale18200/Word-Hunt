import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainGamePage } from "../Pages/MainGamePage";
import Signup from "./Signup";
import Login from "./Login";
import UsersList from "./UsersList";
import SingleUserGame from "./SingleUserGame";
import { Home } from "./Home";

const AllRoutes = () => {
    const pageNotFound = () => {
        return (
            <div className="m-auto w-[30%] flex flex-col items-center">
                <h1 className="text-white text-7xl my-10">404!</h1>
                <p className="text-white text-3xl">Requested Page Not Found</p>
            </div>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/multi" element={<MainGamePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userlist" element={<UsersList />} />
            <Route path="/single" element={<SingleUserGame />} />
            <Route path="*" element={pageNotFound()} />
        </Routes>
    );
};

export default AllRoutes;