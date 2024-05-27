import SearchBox from '../../components/search/SearchBox.jsx';
import { useContext, useEffect, useState } from 'react';
import instance from '../../instance.js';
import { useAsync } from 'react-use';
import { AppContext, MessagesContext } from '../../App.jsx';
import { useDebounce } from '../../hook/Debounce.jsx';
import HeaderSearchResult from './HeaderSearchResult.jsx';
import { useNavigate } from 'react-router-dom';

export default function HeaderSearch() {
  const [searchContent, setSearchContent] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const globalMessage = useContext(MessagesContext);
  const { setLoading, setIsSearching } = useContext(AppContext);
  const navigate = useNavigate();

  const debounce = useDebounce(searchContent, 500);

  useAsync(async () => {
    if (debounce) {
      if (!debounce.trim()) return;
      setIsSearching(true);
      try {
        const res = await instance(`search?q=${encodeURIComponent(debounce)}&type=user`);
        if (res.status === 200) {
          console.log(res.data);
          setSearchResult(res.data);
          setIsSearching(false);
        }
      } catch (e) {
        console.log(e);
        setIsSearching(false);
      }
    }
  }, [debounce]);

  const search = async () => {
    if (!searchContent.trim()) return;
    setSearchResult([]);
    navigate(`/search/${encodeURIComponent(searchContent.trim())}`);
    // setLoading(true);
    // try {
    //   const res = await instance(`search?q=${encodeURIComponent(searchContent)}&type=user`);
    //   if (res.status === 200) {
    //     console.log(res.data);
    //     if (res.data.length > 0) {
    //       setSearchResult(res.data);
    //     } else {
    //       globalMessage.current.show([
    //         {
    //           severity: 'error',
    //           detail: 'Không tìm thây kết quả phù hợp',
    //           closable: true,
    //         },
    //       ]);
    //     }
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    // setLoading(false);
  };

  useEffect(() => {
    if (searchContent === '') {
      setSearchResult([]);
    }
  }, [searchContent]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('.header-search-box')) {
        return;
      }
      setSearchResult([]);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`header-search-box z-[11] relative flex flex-col w-[40%] max-w-[600px] h-full`}>
      <SearchBox isHeader={true} searchContent={searchContent} setSearchContent={setSearchContent} search={search} />
      {searchResult.length > 0 && <HeaderSearchResult results={searchResult} />}
    </div>
  );
}
