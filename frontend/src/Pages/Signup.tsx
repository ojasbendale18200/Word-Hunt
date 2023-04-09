/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { register } from "../utils/types";
import axios, { AxiosResponse } from "axios";

import { Link, useNavigate } from "react-router-dom";
import "../Styles/Universal.css";

const Signup = () => {
  const initData = {
    name: "",
    email: "",
    password: "",
    status: "offline",
    socketId: "",
    matchData: [],
  };
  const [userData, setUserData] = useState<register>(initData);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      let res: AxiosResponse = await axios.post(
        `http://localhost:4321/users/register`,
        userData
      );
      console.log(res);
      // if (res.status === 200) {
      // }
    } catch (error) {
      console.log(error);
    }

    if (
      userData.name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      alert("please fill the Details");
    } else {
      try {
        let res: AxiosResponse = await axios.post(
          `http://localhost:4321/users/register`,
          userData
        );
        console.log(res);
        if (res.status === 200) {
          navigate("/login");
        } else {
          alert("please fill the Details");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center text-white justify-center px-2 mt-24">
      <div id="glass" className=" px-6 py-8 rounded shadow-md w-full">
        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
        <form className="flex flex-col gap-5">
          <input
            type="text"
            className="block w-full p-3 rounded placeholder:text-[#c9eaff] bg-[rgba(255,255,255,0.2)] focus:outline-none"
            name="name"
            placeholder="Username"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            className="block w-full p-3 rounded placeholder:text-[#c9eaff] bg-[rgba(255,255,255,0.2)] focus:outline-none"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            className="block w-full p-3 rounded placeholder:text-[#c9eaff] bg-[rgba(255,255,255,0.2)] focus:outline-none"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <a
            id="button"
            className="text-center"
            onClick={(e) => handleClick(e)}
          >
            <span>Let's Go</span>
            <i></i>
          </a>

          <div className="text-center text-sm font-light">
            By signing up, you agree to the{" "}
            <a className="no-underline hover:text-[#0099FF]" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="no-underline hover:text-[#0099FF]" href="#">
              Privacy Policy
            </a>
          </div>
        </form>
        <div className=" mt-6 text-center font-light">
          Already have an account?{" "}
          <Link className="no-underline hover:text-blue-500" to="/login">
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
