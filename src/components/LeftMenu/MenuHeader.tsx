import Image from "next/image";
import BurgerMenuIcon from '../../../public/free-icon-font-menu-burger.svg';
import { useDebounce } from "@/lib/tools/debounce";
import {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { searchUsersByString } from "@/store/actions/otherUsersThunk";

interface MenuHeaderPorps {
  handleFocus:()=>void;
}

export const MenuHeader = (props:MenuHeaderPorps) => {
  const dispatch = useDispatch<AppDispatch>();
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  // API search results
  const [results, setResults] = useState([]);
  // Searching status (whether there is pending API request)
 // const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

   // Effect for API call
   useEffect(
    () => {
      if (debouncedSearchTerm) {
        dispatch(searchUsersByString(debouncedSearchTerm));
      }
    },
    [debouncedSearchTerm, dispatch] // Only call effect if debounced search term changes
  );

  return (
    <div className="searchBar flex justify-center items-center gap-4">
      <button>
        <Image
          src={BurgerMenuIcon}
          width={32}
          height={32}
          alt="Open menu"
          className="mt-2"
        ></Image>
      </button>
      <input type="text" className="mt-2 h-8 rounded-lg indent-2 w-1/2" onFocus={props.handleFocus} onBlur={props.handleFocus} onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>
  );
};