import "./App.css";
import { Navbar } from "./Components/Navbar"
import AllRoutes from "./Pages/AllRoutes";
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:4321");


const App: React.FC = () => {
    return (
        <div className="App h-[100vh] bg-[url('../public/WordHuntBackgroundLowOpacity.png')] bg-cover bg-center ">
            <Navbar />
            <AllRoutes socket={socket} />
        </div>
    );
};

export default App;