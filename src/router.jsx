import {createBrowserRouter, createRoutesFromElements, Route, Routes} from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/home/Home.jsx";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<App/>}>
            <Route path="home" element={<Home/>}/>
        </Route>,
    ])
);

export default router;