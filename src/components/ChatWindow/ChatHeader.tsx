import { randomNiceColor } from '@/lib/tools/colors';
import { AppDispatch, RootState } from '@/store/store';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import ArrowLeft from '../../../public/arrow-left-solid.svg';
import { setIsMenuOpen } from '@/store/reducers/layoutSlice';

const ChatHeader = () => {
  const currentConversation = useSelector((state: RootState) => state.currentConversation.conversation);
  const dispatch = useDispatch<AppDispatch>();
  if (!currentConversation._id) return null;

  return (
    <div
      className="chat-header h-12 w-full absolute flex justify-start gap-4 items-center"
      style={{ backgroundColor: 'rgba(255,193,7, 0.95)' }}
    >
      <button className='hidden max-sm:block'>
        <Image
          src={ArrowLeft}
          width={32}
          height={32}
          alt="Open menu"
          className={`ml-4 duration-300`}
          onClick={dispatch.bind(null, setIsMenuOpen(true))}
        ></Image>
      </button>
      <div className="ml-4 flex items-center gap-4 max-sm:ml-0">
        <Image
          src={`https://ui-avatars.com/api/?length=1&background=${randomNiceColor(
            currentConversation.name
          )}&color=fff&name=${currentConversation.name}&rounded=true`}
          height={40}
          width={40}
          alt={currentConversation.name}
          className="block border-neutral-950 border-2 rounded-full"
        />
        <p>{currentConversation.name}</p>
      </div>
      <div className={`${currentConversation.socketID ? 'text-white' : ''} mr-4 font-semibold`}>
        {currentConversation.socketID ? 'Online' : 'Offline'}
      </div>
    </div>
  );
};

export default ChatHeader;
