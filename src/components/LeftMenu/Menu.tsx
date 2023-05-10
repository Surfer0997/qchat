import { MenuHeader } from '@/components/LeftMenu/MenuHeader';

import { useCallback, useState } from 'react';
import SearchedUsers from './SearchedUsers';
import DialogueList from './DialogueList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Menu = () => {
  const [isSearchEnabled, setSearchEnabled] = useState(false);
  const handleListDisplay = (val:boolean) => {
    setSearchEnabled(val);
  }

  // USERS SEARCH
  const [searchString, setSearchString] = useState('');
  const handleUserSearch = useCallback((str:string) => {
    setSearchString(str);
  }, []);

   // MOBILE SWITCH SCREENS
 const isMenuOpen = useSelector((state:RootState)=>state.layout.isMenuOpen);

  return (
    <div className={`w-4/12 h-screen overflow-auto max-sm:${isMenuOpen ? 'w-full' : 'hidden' + ''}`} style={{backgroundColor:'rgba(27,27,27, 0.95)'}}>
      <MenuHeader handleListDisplay={handleListDisplay} isSearchEnabled={isSearchEnabled} handleUserSearch={handleUserSearch}/>
      {isSearchEnabled ? <SearchedUsers searchString={searchString}/> : <DialogueList/>}
    </div>
  );
};

export default Menu;
