export type mongoUser = {
  _id: string;
  nickname: string;
  password: string;
  date: Date;
  __v: number;
};

export type Message = {
  _id: string;
  Msgid: string;
  sender: string;
  text: string;
  date: Date;
};

export interface Conversation {
  _id: string;
  name: string;
  messages: Message[];
  order: number;
  members: {
    _id: string;
    nickname: string;
  }[],
  socketID?:string;
}
export type SocketUser = {
  userSocketID: string;
  userID: string;
}

export type OtherUser = {
  _id: string;
  nickname: string;
  socketID?: string | undefined;
}