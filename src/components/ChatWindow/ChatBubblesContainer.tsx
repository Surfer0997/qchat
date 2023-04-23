import { useSelector } from 'react-redux';
import ChatBubble from './ChatBubble';
import MyChatBubble from './MyChatBubble';
import { RootState } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';

interface ChatBubblesContainerProps {
  messages: {
    _id: string;
    sender: string;
    text: string;
    date: Date;
  }[];
}

const ChatBubblesContainer = (props: ChatBubblesContainerProps) => {
  const user = useSelector((state: RootState) => state.user);
  const currentConversation = useSelector((state:RootState)=>state.currentConversation.conversation);
  if (!currentConversation.messages) return <p>Please, open conversation to start</p>
  return (
    <div
      className="py-2"
      style={{
        width: 'calc(100% - 52px)',
      }}
    >
      {currentConversation.messages.map(message => {
        return message.sender === user.data._id ? (
          <MyChatBubble key={message._id ? message._id : uuidv4()} text={message.text} />
        ) : (
          <ChatBubble key={message._id ? message._id : uuidv4()} text={message.text} />
        )
      }
       
      )}
    </div>
  );
};

export default ChatBubblesContainer;
