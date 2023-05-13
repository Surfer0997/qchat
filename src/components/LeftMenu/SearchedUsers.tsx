import { useDispatch, useSelector } from 'react-redux';
import SearchedUserCard from './SearchedUserCard';
import { AppDispatch, RootState } from '@/store/store';
import { SearchAllUsers } from './SearchAllUsers';
import {useState, useEffect} from 'react';
import { OtherUser } from '@/types/types';
import { displayAllUsers, notDisplayAllUsers } from '@/store/reducers/otherUsersSlice';

interface ISearchedUsers {
  searchString: string;
}

const SearchedUsers = ({searchString}:ISearchedUsers) => {
  const searchedUsers = useSelector((state:RootState) => state.otherUsers.users);
  const allUsersAreDisplayed = useSelector((state:RootState)=>state.otherUsers.allUsersAreDisplayed);
  const dispatch = useDispatch<AppDispatch>();

  const [shownUsers, setShownUsers] = useState([] as OtherUser[]);

  useEffect(()=>{
    if (searchString !== '') {
      setShownUsers(searchedUsers.filter((user)=>user.nickname.toLowerCase().includes(searchString.toLowerCase())));
      dispatch(notDisplayAllUsers());
    } else {
      setShownUsers([]);
    }
    return ()=>{
      dispatch(notDisplayAllUsers());
    }
  }, [searchString, searchedUsers, dispatch])

  const handleAllSearch = () => {
    setShownUsers(searchedUsers);
    dispatch(displayAllUsers());
  }

  return (
    <div className="mt-12 pt-4 bg-white w-5/6 m-auto text-center dark:bg-neutral-700" style={{ maxHeight: 'calc(100% - 4rem)', overflow:'auto'}}>
      {shownUsers.map((user)=><SearchedUserCard key={user._id} user={user} />)}

      
      {!allUsersAreDisplayed && <SearchAllUsers handleAllSearch={handleAllSearch}/>}
    </div>
  );
};

export default SearchedUsers;
