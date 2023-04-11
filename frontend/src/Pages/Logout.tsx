import { Navigate } from "react-router-dom";
import "../Styles/Home.css";
import { useEffect, useState } from "react";
import "../Styles/Universal.css"

export const Logout = () => {
    const [state, setState] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setState(true);
        }, 2000)
    }, [])
    return (
        <div className="relative h-[90vh]">
            <div className="logout">
                <p className="text-white text-xl text-center mt-[42%]">Logging out</p>
                <div className="circle"></div>
                <div className="circle2"></div>
            </div>
            {state && <Navigate to={"/"} />}
        </div>
    )
};
