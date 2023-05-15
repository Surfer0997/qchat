export interface BubbleProps {
  text: string;
  date: string;
}

const MyChatBubble = (props: BubbleProps) => {
  return (
    <div className=" relative bg-white rounded-xl w-2/3 ml-auto mr-2 mt-2 pl-3 max-sm:pl-2 p-2 dark:bg-gradient-to-r dark:from-indigo-600 dark:via-purple-600 dark:to-pink-500 whitespace-pre">
      {props.text}
      <p className="absolute bottom-1 right-2 text-xs dark:text-white">{props.date}</p>
    </div>
  );
};

export default MyChatBubble;
