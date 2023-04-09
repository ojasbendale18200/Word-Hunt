import React, { useState } from 'react';
import "../Styles/Navbar.css"
import { AiFillCaretDown } from "react-icons/ai";
import "../Styles/Universal.css"
import { Link, useNavigate } from 'react-router-dom';
import { GoHome } from "react-icons/go";

export const Navbar: React.FC = () => {
    const authentication = localStorage.getItem("userToken");
    const isAuth = true;
    const [gr, setGr] = useState(false);
    const navigate = useNavigate();
    const gameRules = () => {
        return (
            <>
                <h1 className='text-center text-2xl'>Welcome to Word-Hunt</h1>
                <br />
                <p className=''>Word-Hunt is a quiz where player needs to find all the words starting from the same letter.</p>
                <br />
                <h2>Game Rules:</h2>
                <ol className='list-disc'>
                    <li>This game has 5 rounds.</li>
                    <li>A letter would be given at the start of the game</li>
                    <li>Player needs to type the name of country, animal and a person starting from the same letter.</li>
                    <li>The words must be typed within the time-limit. Once the timer runs-out, the score will be updated and next round would begin.</li>
                    <li>Each correct entry will have 10 points. For eg: If a player guessed two corrent inputs and one incorrect than the score of that round would be 20 points</li>
                    <li>In every round a player can earn max 30 points for all three correct guess.</li>
                    <li>At the end of the game the one with max score would win.</li>
                </ol>
                <button className='hover:text-[#0099FF] block m-auto mt-3 bg-[rgba(255,255,255,0.1)] py-2 px-5 rounded-lg' onClick={() => { setGr(false) }}>Got it</button>
            </>
        )
    }
    return (
        <div id='nav' className='font-[cursive] h-[9vh] text-xl flex justify-between py-0 px-10 items-center'>
            {gr && <div id='glass' className='absolute top-[10%] right-[25%] w-[50%] text-white z-10 rounded-lg p-10'>{gameRules()}</div>}
            <img onClick={() => navigate("/")} src='https://i.ibb.co/BZSLGQX/W-H-logo.png' className='h-full hover:cursor-pointer' alt='something went wrong' />
            <div className='flex gap-10'>
                <Link to={"/"}><GoHome className={"h-full hover:text-[#0099FF]"} /></Link>
                <div id='navDropDown' className='relative hover:text-[#0099FF]'>
                    <p className='hover:text-[#0099FF]' >UserName <AiFillCaretDown id='navDownIcon' className='inline transition-transform duration-500' /> </p>
                    <div id='glassWA' className='slideInRight hidden z-10 absolute bg-white w-auto text-black p-3 right-[-25px] rounded-[15px]' >
                        <h3 className='p-2 hover:text-[#0099FF] mb-2 hover:cursor-pointer text-white whitespace-nowrap' onClick={() => { setGr(!gr) }}>Game Rules</h3>
                        {isAuth && <h3 className='p-2 hover:text-[#0099FF] mb-2 hover:cursor-pointer text-white whitespace-nowrap' onClick={() => { navigate("/matchhistory") }}>Previous Games</h3>}
                        {isAuth && <h3 className='p-2 hover:text-[#0099FF] mb-2 hover:cursor-pointer text-white whitespace-nowrap'>Logout</h3>}
                    </div>
                </div>
            </div>
        </div>
    )
}