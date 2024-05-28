import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App.jsx';

export default function ButtonDesktop(props) {
  const navigate = useNavigate();
  const { setReloadHome } = useContext(AppContext);
  return (
    <button
      className={`flex relative w-full px-3 py-2 gap-3 hover:bg-[#333333] ${props.className}
                 ${window.location.pathname.split('/')[1] === props.page ? 'text-red-500' : ''}
                 ${window.location.pathname.split('/')[1] === '' && props.page === 'home' ? 'text-red-500' : ''}
                 ${window.location.pathname.split('/')[1] === 'chat' && props.page === 'notification' ? 'text-red-500' : ''}`}
      onClick={() => {
        props.setPage(props.page);
        if (props.navigateTo === '/home' && window.location.pathname === '/home') setReloadHome(true);
        navigate(props.navigateTo);
      }}>
      {props.children}
    </button>
  );
}
