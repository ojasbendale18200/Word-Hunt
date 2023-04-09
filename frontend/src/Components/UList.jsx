import React from 'react';

export const UList = ({ data, invite }) => {
    return (
        <div className='userList grid grid-cols-3 text-xl items-center text-center p-5'>
            <p className='p-3'>{data.name}</p>
            <p className='p-3'>{data.status}</p>
            <button onClick={() => { invite() }} className=' p-3 rounded-md hover:text-[#0099FF] hover:shadow-[0_0_10px_#0099FF]'>Invite</button>
        </div>
    )
}