import Image from 'next/image';
import PaperPlane from '../../../public/paper-plane-svgrepo-com.svg';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { sendMessageOnClient } from '@/store/reducers/currentConversationSlice';
import { useRef } from 'react';
import { sendMessageOnServer } from '@/store/actions/currentConversationThunk';
import { Message } from '../../types/types';

const ChatInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode == 13 && !e.shiftKey) {
        // Handle sending on enter, but not shift + enter

        // ASYNC SENDING
        if (inputRef.current?.textContent) {
          const message = {
            // MOCK
            sender: '642c86365e47a3c61c2b6e29',
            text: inputRef.current?.textContent,
            date: new Date(),
            _id: '64398d6b68e51ae1bc3a8c78',
          };
          dispatch(sendMessageOnServer(message))
            .unwrap()
            .then(() => {
              if (inputRef.current) inputRef.current.textContent = '';
            });
        }
      }
    },
    [dispatch]
  );

  return (
    <section className="chat-input w-2/3 flex justify-end mb-2 items-center">
      <div className="w-full h-full bg-white max-h-96 rounded-lg flex justify-center">
        <div
          className="h-auto inline-block outline-none bg-purple-400 overflow-hidden"
          style={{ width: '90%', minHeight: '48px', maxHeight: '24rem' }}
          contentEditable="true"
          onKeyDown={handleSendMessage}
          ref={inputRef}
        ></div>
      </div>

      <button className="rounded-full bg-cyan-500 ml-2 flex justify-center items-center">
        <Image src={PaperPlane} width={52} height={48} alt="Send message" className="m-2 mr-3 w-8 h-8"></Image>
      </button>
    </section>
  );
};

export default ChatInput;
