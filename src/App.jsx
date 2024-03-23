import './App.css'
import {Outlet} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import {useState} from "react";

function App() {
    const [page, setPage] = useState('home')
    return (
        <div className="h-dvh w-screen flex flex-col">
            <Outlet/>
            <NavBar setPage={setPage}/>
        </div>
    )
}

export default App
