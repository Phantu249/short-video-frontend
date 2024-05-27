import { AppContext } from '../../App.jsx';
import { useContext } from 'react';

export default function ProfileButton(props) {
  const { isMobile } = useContext(AppContext);
  return (
    <button
      className={`
        ${isMobile ? 'bg-gray-200' : 'bg-[#333333]'}
        w-24
        h-9
        rounded-md ${props.className}`}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}
