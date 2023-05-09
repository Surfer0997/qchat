import { useSelector } from 'react-redux';
import ChatBubblesContainer from './ChatBubblesContainer';
import ChatInput from './ChatInput';
import { RootState } from '@/store/store';
import { NoConversation } from './NoConversation';

const ChatWindow = () => {
  const currentConversation = useSelector((state: RootState) => state.currentConversation.conversation);
  const convExists = currentConversation._id;
  if (!currentConversation.messages) return <NoConversation />;

  return (
    <div
      className="chat-main bg-fuchsia-600 flex flex-col items-center"
      style={{ height: '100%'}}
    >
      <section className="w-full h-auto flex justify-center mb-2 overflow-y-auto scrollbar-thumb-rose-500 scrollbar-thin scrollbar-corner-orange-600 mt-auto">
        <div className="chat-bubbles w-2/3 mb-2 h-full">
          <ChatBubblesContainer />
        </div>
      </section>

      {convExists && <ChatInput />}
    </div>
  );
};

export default ChatWindow;
