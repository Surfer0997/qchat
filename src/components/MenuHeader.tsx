import Image from "next/image";
import BurgerMenuIcon from '../../public/free-icon-font-menu-burger.svg';

interface MenuHeaderPorps {
  handleFocus:()=>void;
}

export const MenuHeader = (props:MenuHeaderPorps) => {
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
      <input type="text" className="mt-2 h-8 rounded-lg indent-2 w-1/2" onFocus={props.handleFocus} onBlur={props.handleFocus}/>
    </div>
  );
};
