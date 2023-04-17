import { randomNiceColor } from '@/lib/tools/colors';
import Image from 'next/image';

const ChatHeader = () => {
  return (
    <div className="chat-header bg-neutral-400 h-12 w-full absolute flex justify-between items-center">
      <div className="ml-4 flex items-center gap-4">
        <Image
          src={`https://ui-avatars.com/api/?length=1&background=${randomNiceColor("HI")}&color=fff&name=${
            "HI"
          }&rounded=true`}
          height={40}
          width={40}
          alt={'FILL ME DADDY'}
          className="block border-neutral-950 border-2 rounded-full"
        />
        <p>Dialogue title</p>
      </div>
      <div className="mr-4">dsfdsf</div>
    </div>
  );
};

export default ChatHeader;
