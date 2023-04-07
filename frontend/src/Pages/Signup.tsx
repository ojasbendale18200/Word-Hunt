/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { register } from "../utils/types";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const initData = {
    name: "",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState<register>(initData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
    <div>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form>
              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded mb-4"
                name="name"
                placeholder="Username"
                required
                onChange={handleChange}
              />

              <input
                type="email"
                className="block border border-gray-300 w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
              />

              <input
                type="password"
                className="block border border-gray-300 w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-center py-3 rounded text-white hover:bg-green-700 focus:outline-none my-1"
                onClick={handleClick}
              >
                Let's Go
              </button>

              <div className="text-center text-sm text-gray-500 mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-gray-500 text-gray-500"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-gray-500 text-gray-500"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </form>
          </div>

          <div className="text-gray-500 mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue-500 text-blue-500"
              href="../login/"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
