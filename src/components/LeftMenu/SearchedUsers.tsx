import { useDispatch, useSelector } from 'react-redux';
import SearchedUserCard from './SearchedUserCard';
import { AppDispatch, RootState } from '@/store/store';
import { searchAllUsers, searchUsersByString } from '@/store/actions/otherUsersThunk';
import { SearchAllUsers } from './SearchAllUsers';

const SearchedUsers = () => {
  const searchedUsers = useSelector((state:RootState) => state.otherUsers.users);
  const dispatch = useDispatch<AppDispatch>();
  const allUsersAreDisplayed = useSelector((state:RootState)=>state.otherUsers.allUsersAreDisplayed);

  const handleAllSearch = () => {
    //dispatch(searchAllUsers());
  }
  return (
    <div className="mt-2 pt-4 bg-white w-5/6 m-auto text-center" style={{ maxHeight: 'calc(100% - 4rem)', overflow:'auto'}}>
      {searchedUsers.map((user)=><SearchedUserCard key={user._id} user={user} />)}

      
      {!allUsersAreDisplayed && <SearchAllUsers handleAllSearch={handleAllSearch}/>}
    </div>
  );
};

export default SearchedUsers;
