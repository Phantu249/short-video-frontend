import { useNavigate } from 'react-router-dom';

export default function Button(props) {
  const navigate = useNavigate();
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
        if (props.navigateTo === '/home' && window.location.pathname === '/home')
          console.log('You are already on the home page');
        navigate(props.navigateTo);
      }}>
      {props.children}
    </button>
  );
}
