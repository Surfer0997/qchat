import { BubbleProps } from "./MyChatBubble";

  const ChatBubble = (props: BubbleProps) => {
    return <div className="bg-white rounded-xl w-2/3 ml-2 mt-2 p-2">{props.text}</div>;
  };
  
  export default ChatBubble;
  