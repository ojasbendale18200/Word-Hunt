import React from 'react';
import "../Styles/Universal.css"

interface propsTypes {
    handleChange: Function,
    handleSubmit: Function,
    score: number,
    letter: string
}
export const GameCard: React.FC<propsTypes> = ({ handleChange, handleSubmit, score, letter }) => {
    return (
        <div id='glass' className={"w-[60vw] border flex-col m-auto p-10 rounded-3xl"}>
            <div className='hover:cursor-default flex justify-between'>
                <h1 className={"mb-10 text-2xl"}>First Letter : {letter}</h1>
                <h1 className={"mb-10 text-2xl"}>Score - {score}</h1>
            </div>
            <div className='mb-10 grid grid-cols-3 gap-10'>
                <input className='px-4 text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]' type='text' placeholder='Country' onChange={(e) => { handleChange(e.target.value, "country") }} />
                <input className='px-4 text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]' type='text' placeholder='Name' onChange={(e) => { handleChange(e.target.value, "name") }} />
                <input className='px-4 text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]' type='text' placeholder='Animal' onChange={(e) => { handleChange(e.target.value, "animal") }} />
            </div>
            <a id='button' onClick={() => { handleSubmit() }} className='w-[30%] block m-auto text-center'><span>Submit</span><i></i></a>
        </div>
    )
}