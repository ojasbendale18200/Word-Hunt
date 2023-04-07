import React from 'react';

interface propsTypes {
    handleChange: Function
}
export const GameCard: React.FC<propsTypes> = ({ handleChange }) => {
    return (
        <div className={"w-[60vw] border flex-col m-auto p-10 rounded-3xl"}>
            <h1 className={"mb-10"}>Player - {""}</h1>
            <div className='mb-10 grid grid-cols-3 gap-10'>
                <input className='px-4 py-2 text-black rounded-xl outline-none' type='text' placeholder='Country' onChange={(e) => { handleChange(e, "country") }} />
                <input className='px-4 py-2 text-black rounded-xl outline-none' type='text' placeholder='Name' onChange={(e) => { handleChange(e, "name") }} />
                <input className='px-4 py-2 text-black rounded-xl outline-none' type='text' placeholder='Animal' onChange={(e) => { handleChange(e, "animal") }} />
            </div>
            <button className={""}>Submit</button>
        </div>
    )
}