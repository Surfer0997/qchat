import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  styles: string;
}

const Card = (props: CardProps) => {
  return (
    <div className={`p-8 rounded-xl border-solid border-black border-2 bg-white h-fit ${props.styles}`}>
      {props.children}
    </div>
  );
};
export default Card;
