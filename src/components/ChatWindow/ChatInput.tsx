import Image from 'next/image';
import PaperPlane from '../../../public/paper-plane-svgrepo-com.svg';
import { useCallback } from 'react';

const ChatInput = () => {
  const handleSendMessage = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      // Handle sending on enter, but not shift + enter
      console.log('SEND NUDES');
    }
  }, []);

  return (
    <section className="chat-input w-2/3 flex justify-end mb-2 items-center">
      <div className="w-full h-full bg-white max-h-96 rounded-lg flex justify-center">
        <div
          className="h-auto inline-block outline-none bg-purple-400 overflow-hidden"
          style={{ width: '90%', minHeight: '48px', maxHeight: '24rem' }}
          contentEditable="true"
          onKeyDown={handleSendMessage}
        ></div>
      </div>

      <button className="rounded-full bg-cyan-500 ml-2 flex justify-center items-center">
        <Image src={PaperPlane} width={52} height={48} alt="Send message" className="m-2 mr-3 w-8 h-8"></Image>
      </button>
    </section>
  );
};

export default ChatInput;
