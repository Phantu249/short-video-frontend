import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/home/Home.jsx';
import Search from './pages/search/Search.jsx';
import Create from './pages/create/Create.jsx';
import Notification from './pages/notification/Notification.jsx';
import Profile from './pages/profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import OneVideoPlayer from './components/OneVideoPlayer.jsx';
import UserProfile from './pages/userprofile/UserProfile.jsx';
import Chat from './pages/chat/Chat.jsx';
import Test from './pages/Test.jsx';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='search' element={<Search />} />
      <Route path='search/:content' element={<Search />} />
      <Route path='create' element={<Create />} />
      <Route path='notification' element={<Notification />} />
      <Route path='profile' element={<Profile />} />
      <Route path='video/:pk' element={<OneVideoPlayer />} />
      <Route path='user/:pk' element={<UserProfile />} />
      <Route path='chat/:pk' element={<Chat />} />
    </Route>,
    <Route path='/login' element={<Login />} />,
    <Route path='/register' element={<Register />} />,
    <Route path='/test' element={<Test />} />,
  ]),
);

export default router;
