import "./App.css";
import { Navbar } from "./Components/Navbar"
import AllRoutes from "./Pages/AllRoutes";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
};

export default App;