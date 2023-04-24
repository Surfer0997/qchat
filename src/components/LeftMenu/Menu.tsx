import { MenuHeader } from '@/components/LeftMenu/MenuHeader';

import { useState } from 'react';
import SearchedUsers from './SearchedUsers';
import DialogueList from './DialogueList';

const Menu = () => {
  const [isSearchEnabled, setSearchEnabled] = useState(false);

  return (
    <div className="w-4/12 bg-amber-500 h-screen overflow-auto">
      <MenuHeader handleFocus={setSearchEnabled.bind(null, true)} />
      {isSearchEnabled ? <SearchedUsers /> : <DialogueList/>}
    </div>
  );
};

export default Menu;
