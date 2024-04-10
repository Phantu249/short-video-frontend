import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/home/Home.jsx';
import Search from './pages/search/Search.jsx';
import Create from './pages/create/Create.jsx';
import Notification from './pages/notification/Notification.jsx';
import Profile from './pages/profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<App />}>
      <Route path='home' element={<Home />} />
      <Route path='search' element={<Search />} />
      <Route path='create' element={<Create />} />
      <Route path='notification' element={<Notification />} />
      <Route path='profile' element={<Profile />} />
    </Route>,
    <Route path='/login' element={<Login />} />,
    <Route path='/register' element={<Register />} />,
  ]),
);

export default router;
