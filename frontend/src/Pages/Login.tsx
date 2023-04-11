/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */

import axios from "axios";
import React, { useState } from "react";
import { login } from "../utils/types";
import { Link, useNavigate } from "react-router-dom";
// import {io} from 'socket.io-client';
import "../Styles/Universal.css";

const Login = () => {
    // const socket = io('http://localhost:4321');
    // socket.emit("connection",{id: 1234, name : "mayank"})
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [noDetailsAlert, setNoDetailsAlert] = useState<boolean>(false);
    const [incorrectDetailsAlert, setIncorrectDetailsAlert] =
        useState<boolean>(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setNoDetailsAlert(true);
            setTimeout(() => {
                setNoDetailsAlert(false);
            }, 3000);
        } else {
            try {
                const payload: login = {
                    email,
                    password,
                };
                let res = await axios.post(
                    `http://localhost:4321/users/login`,
                    payload
                );
                localStorage.setItem("userToken", res.data.token);
                localStorage.setItem("userName", res.data.name);
                navigate("/");
            } catch (err) {
                setIncorrectDetailsAlert(true);
                setTimeout(() => {
                    setIncorrectDetailsAlert(false);
                }, 3000);
            }
        }
    };

    return (
        <div
            id="glass"
            className="w-full relative max-w-sm m-auto my-32 px-5 py-8 text-white"
        >
            {noDetailsAlert && (
                <div
                    className="alertWarning absolute top-[-30%] right-0 left-0 transition duration-500 m-auto text-center p-4 mb-4 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-lg"
                    role="alert"
                >
                    <span className="font-medium">All fields required!</span>
                </div>
            )}
            {incorrectDetailsAlert && (
                <div
                    className="alertWarning absolute top-[-30%] right-0 left-0 transition duration-500 m-auto text-center p-4 mb-4 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-lg"
                    role="alert"
                >
                    <span className="font-medium">Incorrect details</span>
                </div>
            )}
            <div>
                <h2 className="text-center text-3xl text-white">Log in</h2>
            </div>
            <form className="space-y-6 flex flex-col gap-5">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="relative block w-full rounded-md border-0 p-3 bg-[rgba(255,255,255,0.2)] placeholder:text-[#c9eaff] focus:outline-none sm:text-sm sm:leading-6 mb-3"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            className="relative block w-full rounded-md border-0 p-3 bg-[rgba(255,255,255,0.2)] placeholder:text-[#c9eaff] focus:outline-none sm:text-sm sm:leading-6"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm ">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className=" hover:text-[#0099FF]">
                            Forgot your password?
                        </a>
                    </div>
                </div>
                <a
                    id="button"
                    onClick={(e) => handleSubmit(e)}
                    className="w-[100%] text-center m-auto"
                >
                    <span> Sign in</span>
                    <i></i>
                </a>
            </form>
            <p className="text-center mt-7">
                New user?{" "}
                <Link className="hover:text-[#0099FF]" to={"/signup"}>
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;
