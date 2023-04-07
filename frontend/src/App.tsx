import "./App.css";
import { Navbar } from "./Components/Navbar"
import { MainGamePage } from "./Pages/MainGamePage";

const App: React.FC = () => {
    return (
        <div className="App h-[100vh] bg-[url('../public/WordHuntBackgroundLowOpacity.png')] bg-cover bg-center ">
            <Navbar />
            <MainGamePage />
        </div>
    );
}

export default App;