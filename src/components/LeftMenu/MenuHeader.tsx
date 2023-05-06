import Image from "next/image";
import BurgerMenuIcon from '../../../public/free-icon-font-menu-burger.svg';
import ArrowLeft from '../../../public/arrow-left-solid.svg';
import { useDebounce } from "@/lib/tools/debounce";
import {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { searchUsersByString } from "@/store/actions/otherUsersThunk";
import { logOut } from "@/store/reducers/userSlice";

interface MenuHeaderPorps {
  handleListDisplay:(val:boolean)=>void;
  isSearchEnabled: boolean;
}

export const MenuHeader = (props:MenuHeaderPorps) => {
  const dispatch = useDispatch<AppDispatch>();
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

   // Effect for API call
   useEffect(
    () => {
      if (debouncedSearchTerm) {
      //  dispatch(searchUsersByString(debouncedSearchTerm));
      }
    },
    [debouncedSearchTerm, dispatch] // Only call effect if debounced search term changes
  );

  

  return (
    <div className="searchBar flex justify-center items-center gap-4">
      <button onClick={()=>dispatch(logOut())}>
        <Image
          src={props.isSearchEnabled ? ArrowLeft : BurgerMenuIcon}
          width={32}
          height={32}
          alt="Open menu"
          className="mt-2"
          onClick={props.handleListDisplay.bind(null, false)}
        ></Image>
      </button>
      <input type="text" className="mt-2 h-8 rounded-lg indent-2 w-1/2" onFocus={props.handleListDisplay.bind(null, true)} onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>
  );
};