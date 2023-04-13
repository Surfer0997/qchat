import { randomNiceColor } from '@/lib/tools/colors';
import Image from 'next/image';

const DialogueItem = () => {
  const props = {
    name: 'Troy',
  };

  return (
    <div className="bg-white h-20 mr-1 ml-1 rounded-xl flex items-center">
      <Image
        src={`https://ui-avatars.com/api/?length=1&background=${randomNiceColor(props.name)}&color=fff&name=${
          props.name
        }&rounded=true`}
        height={64}
        width={64}
        alt={props.name}
        className='ml-2 block'
      />
      <div className='ml-2'>
        <b>{props.name}</b>
        <p>Some message...</p>
      </div>
    </div>
  );
};

export default DialogueItem;
