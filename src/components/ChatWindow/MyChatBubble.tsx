export interface BubbleProps {
  text: string;
}

const MyChatBubble = (props: BubbleProps) => {
  return <div className="bg-white rounded-xl w-2/3 ml-auto mr-2 mt-2 pl-3 max-sm:pl-2 p-2 dark:bg-gradient-to-r dark:from-indigo-600 dark:via-purple-600 dark:to-pink-500 whitespace-pre">{props.text}</div>;
};

export default MyChatBubble;
