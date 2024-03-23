export default function ProfileButton(props) {
  return (
    <button
      className='
        bg-gray-200
        w-24
        h-9
        rounded-md
  '>
      {props.children}
    </button>
  );
}
