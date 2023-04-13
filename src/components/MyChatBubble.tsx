export interface BubbleProps {
  text: string;
}

const MyChatBubble = (props: BubbleProps) => {
  return <div className="bg-white rounded-xl w-2/3 ml-auto mr-2 mb-4 p-2">{props.text}</div>;
};

export default MyChatBubble;
