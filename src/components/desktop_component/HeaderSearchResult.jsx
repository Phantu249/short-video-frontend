import UserResult from '../search/UserResult.jsx';

export default function HeaderSearchResult(props) {
  return (
    <div className='absolute z-[10] top-16 flex flex-col bg-[#444444] w-full h-fit border-[1px] border-[#555555] rounded-2xl overflow-hidden header-search-result'>
      {props.results ? props.results.map((result, index) => <UserResult key={index} user={result} />) : ''}
    </div>
  );
}
