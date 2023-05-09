import { randomNiceColor } from '@/lib/tools/colors';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const ChatHeader = () => {
  const currentConversation = useSelector((state: RootState) => state.currentConversation.conversation);
  if (!currentConversation._id) return null;

  return (
    <div className="chat-header bg-neutral-400 h-12 w-full absolute flex justify-start gap-4 items-center">
      <div className="ml-4 flex items-center gap-4">
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
      <div className={`${currentConversation.socketID ? 'text-green-500' : ''} mr-4 font-semibold`}>{currentConversation.socketID ? 'Online' : 'Offline'}</div>
    </div>
  );
};

export default ChatHeader;
