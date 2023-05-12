import Image from 'next/image';
import BurgerMenuIcon from '../../../public/free-icon-font-menu-burger.svg';
import ArrowLeft from '../../../public/arrow-left-solid.svg';
import { useDebounce } from '@/lib/tools/debounce';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { logOut } from '@/store/reducers/userSlice';

interface MenuHeaderPorps {
  handleListDisplay: (val: boolean) => void;
  isSearchEnabled: boolean;
  handleUserSearch: (str: string) => void;
}

export const MenuHeader = ({ handleUserSearch, isSearchEnabled, handleListDisplay }: MenuHeaderPorps) => {
  const dispatch = useDispatch<AppDispatch>();
  // Search term
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm || debouncedSearchTerm === '') {
        handleUserSearch(debouncedSearchTerm);
      }
    },
    [debouncedSearchTerm, dispatch, handleUserSearch] // Only call effect if debounced search term changes
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle menu
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuButton = () => {
    if (!isSearchEnabled) {
      setShowMenu(!showMenu);
    } else {
      handleListDisplay(false);
    }
  };
  return (
    <div
      className="searchBar flex justify-center items-center gap-4 relative"
      style={{ height: '40px' }}
      onMouseLeave={setShowMenu.bind(null, false)}
    >
      {showMenu && (
        <div className="absolute h-80 duration-300 z-20 max-sm:h-60 w-3/5 max-sm:w-2/5" style={{ top: '2.5rem', left: '0rem'}}>
          <div className="absolute w-5/6 h-72 bg-white dark:bg-neutral-600 dark:border-2 dark:border-neutral-400 rounded-md border-cyan-400 shadow-2xl flex flex-col p-2 pt-4 left-4 top-2 duration-300 max-sm:h-60 max-sm:w-full">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-all duration-200"
              onClick={() => dispatch(logOut())}
            >
              Log out
            </button>
          </div>
        </div>
      )}

      <button>
        <Image
          src={isSearchEnabled ? ArrowLeft : BurgerMenuIcon}
          width={32}
          height={32}
          alt="Open menu"
          className={`${showMenu && 'rotate-90'} mt-2 duration-300`}
          onClick={handleMenuButton}
        ></Image>
      </button>
      <input
        type="text"
        className="mt-2 h-8 rounded-lg indent-2 w-1/2"
        onFocus={handleListDisplay.bind(null, true)}
        onClick={setShowMenu.bind(null, false)}
        onChange={handleSearch}
      />
    </div>
  );
};
