import React from 'react';
import "../Styles/Navbar.css"
import { AiFillCaretDown } from "react-icons/ai";

export const Navbar: React.FC = () => {
    return (
        <div id='nav' className='font-[cursive] h-[9vh] text-xl flex justify-between py-0 px-10 items-center'>
            <h1>Word-Hunt</h1>
            <div id='navDropDown'>
                <h2>UserName <AiFillCaretDown id='navDownIcon' className='inline transition-transform duration-500' /> </h2>
                <div className='hidden absolute'>
                    <h3>Game rules</h3>
                    <h3>Logout</h3>
                </div>
            </div>
        </div>
    )
}