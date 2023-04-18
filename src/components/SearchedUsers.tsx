import SearchedUserCard from './SearchedUserCard';

const SearchedUsers = () => {
  return (
    <div className="mt-4 pt-4 bg-white w-5/6 m-auto" style={{ height: 'calc(100% - 4rem)' }}>
        <SearchedUserCard nickname="John" />
        <SearchedUserCard nickname="John" />
        <SearchedUserCard nickname="John" />
        <SearchedUserCard nickname="John" />
        <SearchedUserCard nickname="John" />
    </div>
  );
};

export default SearchedUsers;
