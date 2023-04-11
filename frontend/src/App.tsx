import "./App.css";
import { useState, useEffect } from "react";
import { Navbar } from "./Components/Navbar"
import AllRoutes from "./Pages/AllRoutes";
import io, { Socket } from "socket.io-client";

const socket = io("https://word-hunt-59qf.onrender.com");


const App: React.FC = () => {
    const [animation, setAnimation] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setAnimation(false);
        }, 3000)
    }, [])
    return (
        <div className="App relative">
            {
                animation ?
                    <div id='welcomeAnimation' className='bg-[#27282c] h-[80vh] flex flex-col justify-center gap-14 items-center'>
                        <div className='text-white text-3xl md:text-5xl'>Welcome To</div>
                        <div className='grid sm:grid-cols-1 md:grid-cols-2 '>
                            <img src='https://i.ibb.co/ZGfvJtZ/WORD.png' alt='Something went wrong' />
                            <img src='https://i.ibb.co/cNrv8pq/HUNT.png' alt='Something went wrong' />
                        </div>
                    </div>
                    :
                    <>
                        <Navbar />
                        <AllRoutes socket={socket} />
                    </>
            }
        </div>
    );
};

export default App;