import { randomNiceColor } from '@/lib/tools/colors';
import { setAsCurrentConversation } from '@/store/reducers/currentConversationSlice';
import { setIsMenuOpen } from '@/store/reducers/layoutSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Conversation } from '@/types/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface DialogueItemProps {
  conversation: Conversation;
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const DialogueItem = (props: DialogueItemProps) => {
  const [windowWidth] = useWindowSize();
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector((state: RootState) => state.user.data._id);
  const lastMessageFromDialogue = props.conversation.messages[props.conversation.messages.length - 1];
  const diaplayedLastMessage =
    (lastMessageFromDialogue.sender === userId ? 'You: ' : '') + lastMessageFromDialogue.text;

  //// FIND SOCKET ID IF EXISTS (maybe FIX TODO)
  // get other user ID
  const targetUserId =
    props.conversation.members[0]._id === userId
      ? props.conversation.members[1]._id
      : props.conversation.members[0]._id;
  // get other users
  // find the one we need
  const targetUser = useSelector((state: RootState) =>
    state.otherUsers.users.filter(user => user._id === targetUserId)
  )[0];

  // pass socket
  const handleClick = () => {
    dispatch(setAsCurrentConversation({ ...props.conversation, socketID: targetUser?.socketID }));
    dispatch(setIsMenuOpen(false));
  }

  return (
    <div
      className="bg-slate-50 h-20 mr-2 ml-2 mb-2 rounded-xl flex items-center duration-300 dark:bg-neutral-800 dark:border-2 dark:border-neutral-700"
      onClick={handleClick}
    >
      <div className={`relative duration-300 ${targetUser?.socketID && 'after:absolute after:w-2 after:h-2 after:rounded-full after:bg-green-500 after:top-1 after:right-0'}`}>
        <Image
          src={`https://ui-avatars.com/api/?length=1&background=${randomNiceColor(
            props.conversation.name
          )}&color=fff&name=${props.conversation.name}&rounded=true`}
          height={64}
          width={64}
          alt={props.conversation.name}
          className="ml-2 block "
        />
      </div>
      <div className="ml-2 flex flex-col overflow-hidden">
        <b>{props.conversation.name}</b>
        <p
          className="overflow-hidden whitespace-nowrap"
          style={{ textOverflow: 'ellipsis', display: 'inline-block', width: `${windowWidth / 4.5}px` }}
        >
          {diaplayedLastMessage}
        </p>
        {/* has to be fixed width, sucks */}
      </div>
    </div>
  );
};

export default DialogueItem;
