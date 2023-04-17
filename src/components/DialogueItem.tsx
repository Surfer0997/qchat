import { randomNiceColor } from '@/lib/tools/colors';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

interface DialogueItemProps {
  name: string;
  messages: {
    _id: string;
    sender: string;
    text: string;
    date: Date;
  }[];
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
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <div className="bg-white h-20 mr-2 ml-2 mb-2 rounded-xl flex items-center">
      <Image
        src={`https://ui-avatars.com/api/?length=1&background=${randomNiceColor(props.name)}&color=fff&name=${
          props.name
        }&rounded=true`}
        height={64}
        width={64}
        alt={props.name}
        className='ml-2 block'
      />
      <div className='ml-2 flex flex-col overflow-hidden'>
        <b>{props.name}</b>
        <p className='overflow-hidden whitespace-nowrap' style={{textOverflow:'ellipsis', display:'inline-block', width:`${windowWidth / 4.5}px`}}>{props.messages[props.messages.length-1].text}</p>
        {/* has to be fixed width, sucks */}
      </div>
    </div>
  );
};

export default DialogueItem;
