import { useEffect, useState } from 'react';

export default function Test() {
  const [offset, setOffset] = useState(0);
  const [videos, setVideos] = useState([1, 2]); // Khởi tạo danh sách video với 3 video
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);

  function handleClick() {
    console.log('Button clicked');
    // if (offset <= -434 * 2) {
    //   setOffset(0);
    //   return;
    // }
    setOffset(offset - 434);
    setVideos((prevVideos) => {
      return [...prevVideos, prevVideos.at(-1) + 1];
    }); // Thêm video mới vào danh sách
    // setVideos((prev) => {
    //   prev.shift();
    //   return [...prev];
    // });
    setAdd(true);
  }

  useEffect(() => {
    if (!add) return;
    const interval = setInterval(() => {
      setVideos((prev) => {
        console.log('Remove video');
        prev.shift();
        return [...prev];
      });
      setOffset(offset + 434);
      setAdd(false);
    }, 1000);
    return () => clearInterval(interval);
  }, [add]);

  console.log(videos);

  function back() {
    console.log('Button back');
    setOffset(offset + 434);
    // setVideos((prevVideos) => {
    //   prevVideos.pop();
    //   return [prevVideos.length - 2, ...prevVideos];
    // }); // Thêm video mới vào danh sách
  }

  return (
    <div>
      <button onClick={handleClick} className='  bg-blue-500  text-white p-2'>
        Button
      </button>
      <br />
      <button onClick={back} className='  bg-blue-500  text-white p-2'>
        Button
      </button>
      <div className='flex flex-col place-content-center p-20'>
        <div className='relative bg-[#7777] w-[250px] h-[450px] border-2 border-black p-1 '>
          <div className=' absolute transition-transform duration-500' style={{ transform: `translateY(${offset}px)` }}>
            {videos.map((id) => (
              <Video key={id} id={id} /> // Hiển thị danh sách video
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Video(props) {
  return (
    <div className='flex place-content-center bg-red-300 w-[238px] h-[438px] border-2 border-black'>
      Video {props.id}
    </div>
  );
}
