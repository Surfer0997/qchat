import Image from 'next/image';
import BurgerMenuIcon from '../../../public/free-icon-font-menu-burger.svg';
import ArrowLeft from '../../../public/arrow-left-solid.svg';
import { useDebounce } from '@/lib/tools/debounce';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';

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
  return (
    <div className="searchBar flex justify-center items-center gap-4">
      <button>
        <Image
          src={isSearchEnabled ? ArrowLeft : BurgerMenuIcon}
          width={32}
          height={32}
          alt="Open menu"
          className="mt-2"
          onClick={handleListDisplay.bind(null, false)}
        ></Image>
      </button>
      <input
        type="text"
        className="mt-2 h-8 rounded-lg indent-2 w-1/2"
        onFocus={handleListDisplay.bind(null, true)}
        onChange={handleSearch}
      />
    </div>
  );
};
