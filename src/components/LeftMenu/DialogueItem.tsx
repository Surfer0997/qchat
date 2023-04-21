import { randomNiceColor } from '@/lib/tools/colors';
import { setAsCurrentConversation } from '@/store/reducers/currentConversationSlice';
import { Conversation } from '@/store/reducers/userConversationsSlice';
import { AppDispatch } from '@/store/store';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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

  return (
    <div
      className="bg-white h-20 mr-2 ml-2 mb-2 rounded-xl flex items-center"
      onClick={() => dispatch(setAsCurrentConversation(props.conversation))}
    >
      <Image
        src={`https://ui-avatars.com/api/?length=1&background=${randomNiceColor(
          props.conversation.name
        )}&color=fff&name=${props.conversation.name}&rounded=true`}
        height={64}
        width={64}
        alt={props.conversation.name}
        className="ml-2 block"
      />
      <div className="ml-2 flex flex-col overflow-hidden">
        <b>{props.conversation.name}</b>
        <p
          className="overflow-hidden whitespace-nowrap"
          style={{ textOverflow: 'ellipsis', display: 'inline-block', width: `${windowWidth / 4.5}px` }}
        >
          {props.conversation.messages[props.conversation.messages.length - 1].text}
        </p>
        {/* has to be fixed width, sucks */}
      </div>
    </div>
  );
};

export default DialogueItem;
