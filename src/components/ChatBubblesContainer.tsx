import { useSelector } from 'react-redux';
import ChatBubble from './ChatBubble';
import MyChatBubble from './MyChatBubble';
import { RootState } from '@/store/store';

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
    console.log(user.data._id);
  return (
    <div className="bg-violet-400 py-2" style={{ width: 'calc(100% - 52px)',}}>
      {props.messages.map(message =>
        message.sender === user.data._id ? (
          <MyChatBubble key={message._id} text={message.text} />
        ) : (
          <ChatBubble key={message._id} text={message.text} />
        )
      )}
    </div>
  );
};

export default ChatBubblesContainer;
