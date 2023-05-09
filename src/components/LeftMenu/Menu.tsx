import { MenuHeader } from '@/components/LeftMenu/MenuHeader';

import { useCallback, useState } from 'react';
import SearchedUsers from './SearchedUsers';
import DialogueList from './DialogueList';

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

  return (
    <div className="w-4/12 bg-amber-500 h-screen overflow-auto">
      <MenuHeader handleListDisplay={handleListDisplay} isSearchEnabled={isSearchEnabled} handleUserSearch={handleUserSearch}/>
      {isSearchEnabled ? <SearchedUsers searchString={searchString}/> : <DialogueList/>}
    </div>
  );
};

export default Menu;
