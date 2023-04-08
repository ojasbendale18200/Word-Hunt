import React from 'react';
import "../Styles/Navbar.css"
import { AiFillCaretDown } from "react-icons/ai";
import "../Styles/Universal.css"

export const Navbar: React.FC = () => {
    return (
        <div id='nav' className='font-[cursive] h-[9vh] text-xl flex justify-between py-0 px-10 items-center'>
            <img src='https://i.ibb.co/BZSLGQX/W-H-logo.png' className='h-full hover:cursor-pointer' alt='something went wrong' />
            <div id='navDropDown' className='relative'>
                <h2>UserName <AiFillCaretDown id='navDownIcon' className='inline transition-transform duration-500' /> </h2>
                <div id='glass' className='hidden z-10 absolute bg-white w-auto text-black p-3 right-[-25px] rounded-[15px]' >
                    <h3 className='p-2 mb-2 hover:cursor-pointer text-white whitespace-nowrap'>Game Rules</h3>
                    <h3 className='p-2 mb-2 hover:cursor-pointer text-white whitespace-nowrap'>Previous Games</h3>
                    <h3 className='p-2 mb-2 hover:cursor-pointer text-white whitespace-nowrap'>Logout</h3>
                </div>
            </div>
        </div>
    )
}