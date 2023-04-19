import { randomNiceColor } from '@/lib/tools/colors';
import Image from 'next/image';

interface SearchedUserCardProps {
  nickname: string;
}

const SearchedUserCard = (props: SearchedUserCardProps) => {
  return (
    <div className="group h-16 w-5/6 m-auto duration-300  flex items-center gap-4 hover:rounded-xl hover:bg-slate-100 hover:bg-opacity-80">
      <Image
        src={`https://ui-avatars.com/api/?length=1&background=${randomNiceColor(props.nickname)}&color=fff&name=${
          props.nickname
        }&rounded=true`}
        height={48}
        width={48}
        alt={props.nickname}
        className="ml-2 block"
      />
      <div>
      <b>{props.nickname}</b>
      {/* TODO */}
      <p className='text-xs text-slate-400 group-hover:text-gray-800 duration-300'>Last seen century ago</p>
      </div>
    </div>
  );
};

export default SearchedUserCard;
