import Image from "next/image";
import BurgerMenuIcon from '../../public/free-icon-font-menu-burger.svg';

export const Menu = () => {
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
      <input type="text" className="mt-2 h-8 rounded-lg indent-2 w-1/2" />
    </div>
  );
};
