import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Home.css"

export const Home = () => {
    const authentication = JSON.parse(localStorage.getItem(""));
    const isAuth = false;

    return (
        <div id='home' className='font-[cursive] grid grid-cols-2 bg-[#27282c]'>
            <div className='homeLogoDiv text-white flex flex-col py-40 items-center justify-center'>
                <img className='homeLogo' src="https://i.ibb.co/ZGfvJtZ/WORD.png" alt="Something went wrong" />
                <img className='homeLogo2' src="https://i.ibb.co/cNrv8pq/HUNT.png" alt="Something went wrong" />
            </div>
            <div>
                {
                    isAuth ?
                        <div className='text-white flex flex-col py-52 items-center justify-center gap-20'>
                            <Link className='homeComponents skew-y-12 py-5 px-10' id='homeButtons' style={{ "--clr": "yellow" }} to={"/singleplayer"}><span>Single-player</span><i></i></Link>
                            <Link className='homeComponents skew-y-12 py-5 px-10' id='homeButtons' style={{ "--clr": "red" }} to={"/multiplayer"}><span>Multi-player</span><i></i></Link>
                        </div>
                        :
                        <div className='text-white flex flex-col pt-52 items-center justify-center gap-20'>
                            <Link className='homeComponents skew-y-12 py-5 px-10' id='homeButtons' style={{ "--clr": "yellow" }} to={"/login"}><span>Login</span><i></i></Link>
                            <Link className='homeComponents skew-y-12 py-5 px-10' id='homeButtons' style={{ "--clr": "#0099FF" }} to={"/signup"}><span>Signup</span><i></i></Link>
                        </div>
                }
            </div>
        </div>
    )
}