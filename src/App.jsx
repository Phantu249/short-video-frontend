import './App.css'
import {Outlet} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Header from "./components/Header.jsx";

function App() {
    return (
        <div className="h-dvh w-screen flex flex-col">
            <Header/>
            <Outlet/>
            <NavBar/>
        </div>
    )
}

export default App
