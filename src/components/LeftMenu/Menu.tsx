import { MenuHeader } from '@/components/LeftMenu/MenuHeader';

import { useState } from 'react';
import SearchedUsers from './SearchedUsers';
import DialogueList from './DialogueList';

const Menu = () => {
  const [isSearchEnabled, setSearchEnabled] = useState(false);

  const handleListDisplay = (val:boolean) => {
    setSearchEnabled(val);
  }
  return (
    <div className="w-4/12 bg-amber-500 h-screen overflow-auto">
      <MenuHeader handleListDisplay={handleListDisplay} isSearchEnabled={isSearchEnabled}/>
      {isSearchEnabled ? <SearchedUsers /> : <DialogueList/>}
    </div>
  );
};

export default Menu;
