import { useNavigate } from 'react-router-dom';
import { instanceWToken } from '../../instance.js';
import { AppContext, MessagesContext } from '../../App.jsx';
import { useContext } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { TiDelete } from 'react-icons/ti';

export default function Video(props) {
  const navigate = useNavigate();
  const globalMessage = useContext(MessagesContext);
  const { setReloadHome } = useContext(AppContext);
  const handleVideoClick = (e) => {
    e.stopPropagation();
    navigate(`/video/${props.video.id}`);
  };

  const accept = async () => {
    console.log('accept');
    try {
      const response = await instanceWToken.delete(`video/${encodeURIComponent(props.video.id)}`);
      if (response.status === 200) {
        props.handleDel(props.video.id);
        setReloadHome(true);
        globalMessage.current.show([
          {
            severity: 'success',
            detail: 'Delete success',
            closable: true,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    }
  };

  const reject = () => {};

  const showConfirm = (e) => {
    confirmDialog({
      message: 'Bạn có muốn xóa video này?',
      header: 'Xác nhận xóa!',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept,
      reject,
    });
  };

  return (
    <div className={` relative w-1/3 h-1/2 min-h-52 max-h-96 p-[1px] lg:w-1/4 lg:p-[2px] xl:w-1/5 xl:p-[2px]`}>
      {props.board === 'userVideo' && (
        <TiDelete
          onClick={showConfirm}
          className='absolute bottom-1 right-1 z-[10] size-7 drop-shadow-[0_1px_0px_rgba(200,200,200,0.8)] text-gray-600 cursor-pointer'
        />
      )}
      <img
        className=' w-full h-full rounded object-cover bg-gray-500'
        loading={'lazy'}
        src={props.video.thumbnail}
        alt='videoAlt'
        onClick={handleVideoClick}
      />
    </div>
  );
}
