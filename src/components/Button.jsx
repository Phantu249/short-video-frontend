import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App.jsx';

export default function Button(props) {
  const navigate = useNavigate();
  const { setReloadHome } = useContext(AppContext);
  return (
    <button
      className='
                    flex
                    flex-col
                    relative
                    justify-center
                    items-center
                    w-1/5
                    text-xs
                    active:bg-zinc-700
                    '
      onClick={() => {
        props.setPage(props.page);
        if (props.navigateTo === '/home' && window.location.pathname === '/home') setReloadHome(true);
        navigate(props.navigateTo);
      }}>
      {props.children}
    </button>
  );
}
