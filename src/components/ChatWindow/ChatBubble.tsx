import { BubbleProps } from './MyChatBubble';

const ChatBubble = (props: BubbleProps) => {
  return (
    <div className="bg-white relative rounded-xl w-2/3 ml-2 mt-2 p-2 pl-3 max-sm:pl-2 dark:bg-gradient-to-r dark:from-indigo-700 dark:from-00% dark:via-sky-500 dark:via-40% dark:to-emerald-500 dark:to-100%">
      {props.text}
      <p className="absolute bottom-1 right-2 text-xs dark:text-white">{props.date}</p>
    </div>
  );
};

export default ChatBubble;
