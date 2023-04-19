import { useSelector } from 'react-redux';
import SearchedUserCard from './SearchedUserCard';
import { RootState } from '@/store/store';

const SearchedUsers = () => {
  const searchedUsers = useSelector((state:RootState) => state.otherUsers.users);
  return (
    <div className="mt-4 pt-4 bg-white w-5/6 m-auto" style={{ height: 'calc(100% - 4rem)' }}>
      {searchedUsers.map((user)=><SearchedUserCard key={user._id} nickname={user.nickname} />)}
    </div>
  );
};

export default SearchedUsers;
