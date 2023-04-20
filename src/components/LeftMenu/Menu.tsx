import { MenuHeader } from '@/components/LeftMenu/MenuHeader';

import { useState } from 'react';
import SearchedUsers from './SearchedUsers';
import DialogueList from './DialogueList';

const Menu = () => {
  const [isSearchEnabled, setSearchEnabled] = useState(false);

  return (
    <div className="w-4/12 bg-amber-500 h-screen">
      <MenuHeader handleFocus={setSearchEnabled.bind(null, !isSearchEnabled)} />
      {isSearchEnabled ? <SearchedUsers /> : <DialogueList/>}
    </div>
  );
};

export default Menu;
