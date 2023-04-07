import "./App.css";
import { Navbar } from "./Components/Navbar"
import AllRoutes from "./Pages/AllRoutes";

const App: React.FC = () => {
  return (
    <div  className="App h-[100vh] bg-[url('../public/WordHuntBackgroundLowOpacity.png')] bg-cover bg-center ">
      <Navbar />
      <AllRoutes />
    </div>
  );
};

export default App;