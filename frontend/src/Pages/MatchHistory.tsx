import React from 'react';
import "../Styles/Universal.css";

export const MatchHistory = () => {
    interface matchData {
        playerScore: number,
        opponentName: string,
        opponentScore: number
    }
    const matchData: matchData[] = [];
    return (
        <div id='glass' className='flex flex-col hover:cursor-default text-white w-[60%] m-auto mt-10 border-solid gap-3 border-2 h-[75vh]'>
            <p className='text-center text-3xl my-4'>Match History</p>
            <div className='grid grid-cols-2 text-center text-2xl'>
                <div className='grid grid-cols-1 border-r-2'>
                    <p>Your score</p>
                </div>
                <div className='grid grid-cols-2'>
                    <p className='border-r-2'>Opponent</p>
                    <p>Score</p>
                </div>
            </div>
            <div className='flex flex-col gap-5 overflow-x-auto'>
                {
                    matchData[0] ?
                        matchData.map(e => {
                            return (
                                <div className='grid grid-cols-2 text-center text-xl'>
                                    <div className='grid grid-cols-1'>
                                        <p>{e.playerScore}{e.playerScore > e.opponentScore && "🥳"}</p>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <p>{e.opponentName}</p>
                                        <p>{e.opponentScore}{e.playerScore < e.opponentScore && "🥳"}</p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <p className='text-center text-xl'>Not matches played</p>
                }
            </div>
        </div>
    )
}