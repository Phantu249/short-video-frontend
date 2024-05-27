import UserResult from '../search/UserResult.jsx';

export default function HeaderSearchResult(props) {
  return (
    <div className='absolute z-[20] top-16 flex flex-col bg-[#222222] w-full h-fit rounded-2xl overflow-hidden header-search-result'>
      {props.results ? props.results.map((result, index) => <UserResult key={index} user={result} />) : ''}
    </div>
  );
}
