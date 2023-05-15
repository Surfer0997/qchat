import Image from 'next/image';
import PaperPlane from '../../../public/paper-plane-svgrepo-com.svg';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useRef } from 'react';
import { createConversationAnSendMessageOnServer, sendMessageOnServer } from '@/store/actions/currentConversationThunk';
import { Message } from '../../types/types';
import { v4 as uuid } from 'uuid';
import { socket } from '@/lib/socket/socketInitializer';

const ChatInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLDivElement>(null);
  const myId = useSelector((state: RootState) => state.user.data._id);
  const currentConversation = useSelector((state: RootState) => state.currentConversation.conversation);

  const sendMessage = useCallback(() => {
    if (inputRef.current?.textContent) {
      const message = {
        sender: myId,
        text: inputRef.current?.textContent,
        date: new Date(),
        Msgid: uuid(),
      } as Message;

      dispatch(
        currentConversation.messages.length !== 0
          ? sendMessageOnServer(message)
          : createConversationAnSendMessageOnServer({
              myId: currentConversation.members[1]._id,
              destId: currentConversation.members[0]._id,
              message,
              socketID: currentConversation?.socketID,
            })
      )
        .unwrap()
        .then(() => {
          if (inputRef.current) inputRef.current.textContent = '';
          if (currentConversation.socketID) {
            socket.emit('private message', {
              author: myId,
              message,
              to: currentConversation.socketID,
            });
          }
        });
    }
  }, [myId, currentConversation, dispatch]);

  const handleSendMessageFromKeyboard = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      // Handle sending on enter, but not shift + enter
      e.preventDefault();
      // ASYNC SENDING
      sendMessage();
    }
  };
  const handleSendMessageFromButton = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // ASYNC SENDING
      sendMessage();
  };

  return (
    <section className="chat-input w-2/3 flex justify-end mb-2 items-center max-sm:w-5/6">
      <div className="w-full h-full bg-white max-h-96 rounded-lg flex justify-center shadow-2xl dark:bg-neutral-800" onClick={()=>inputRef.current?.focus()}>
        <div
          className="h-auto inline-block outline-none overflow-hidden whitespace-pre-line"
          style={{ width: '90%', minHeight: '48px', maxHeight: '24rem' }}
          // Firefox does not support 'plaintext-only' value, which is needed
          // @ts-ignore
          contentEditable={`${navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? true : 'plaintext-only'}`}
          onKeyDown={handleSendMessageFromKeyboard}
          ref={inputRef}
        ></div>
      </div>

      <button
        className="rounded-full ml-2 flex justify-center items-center"
        onClick={handleSendMessageFromButton}
      >
        <Image src={PaperPlane} width={52} height={48} alt="Send message" className="m-2 mr-3 w-8 h-8"></Image>
      </button>
    </section>
  );
};

export default ChatInput;
