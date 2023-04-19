import DialogueItem from "./DialogueItem";

interface DialogueListPorps {
  dialogues: {
    _id: string;
    name: string;
    messages: {
      _id: string;
      sender: string;
      text: string;
      date: Date;
    }[];
  }[]
}

const DialogueList = (props: DialogueListPorps) => {
  return (
    <div className="mt-2">
      {props.dialogues.map((dialogue)=><DialogueItem key={dialogue._id} name={dialogue.name} messages={dialogue.messages}/>)}
    </div>
  );
};

export default DialogueList;
