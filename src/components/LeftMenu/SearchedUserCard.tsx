import { randomNiceColor } from '@/lib/tools/colors';
import { setAsCurrentConversation } from '@/store/reducers/currentConversationSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Message } from '@/types/types';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {v4 as uuid} from 'uuid';

interface SearchedUserCardProps {
  user: {
    nickname: string;
    _id: string;
    socketID?: string
  }
}

const SearchedUserCard = (props: SearchedUserCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const userConversations = useSelector((state:RootState)=>state.userConversations.conversations);
  const userData = useSelector((state:RootState)=>state.user.data);

  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    const existingConversation = userConversations.find((conv)=>conv.members.find((member)=>member._id === props.user._id));

    const mockNewCurrentConversation = {
      _id: uuid(),
      name: props.user.nickname,
      messages: [] as Message[],
      members: [
        {
          nickname: props.user._id,
          _id: props.user._id
        },
        userData
      ],
      socketID: props.user?.socketID
    };

    dispatch(setAsCurrentConversation(existingConversation ? {...existingConversation, socketID: props.user?.socketID} : mockNewCurrentConversation));
    
  }

  return (
    <div className="group h-16 w-5/6 m-auto duration-300  flex items-center gap-4 hover:rounded-xl hover:bg-slate-100 hover:bg-opacity-80" onClick={handleClick}>
      <Image
        src={`https://ui-avatars.com/api/?length=1&background=${randomNiceColor(props.user.nickname)}&color=fff&name=${
          props.user.nickname
        }&rounded=true`}
        height={48}
        width={48}
        alt={props.user.nickname}
        className="ml-2 block"
      />
      <div>
      <b>{props.user.nickname}</b>
      {/* TODO */}
      <p className='text-xs text-slate-400 group-hover:text-gray-800 duration-300'>Last seen a century ago</p>
      </div>
    </div>
  );
};

export default SearchedUserCard;
