import Image from 'next/image';
import PaperPlane from '../../public/paper-plane-svgrepo-com.svg';

const ChatInput = () => {
  return (
    <section className="chat-input w-2/3 flex justify-end mb-2 items-center">
      <div className="w-full h-full bg-white max-h-96 rounded-lg flex justify-center">
        <div
          className="h-auto inline-block outline-none"
          style={{ width: '90%', minHeight: '48px' }}
          contentEditable="true"
        ></div>
      </div>

      <button className="rounded-full bg-cyan-500 ml-2 flex justify-center items-center">
        <Image src={PaperPlane} width={52} height={48} alt="Send message" className="m-2 mr-3 w-8 h-8"></Image>
      </button>
    </section>
  );
};

export default ChatInput;
