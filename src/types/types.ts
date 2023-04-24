export type mongoUser = {
  _id: string;
  nickname: string;
  password: string;
  date: Date;
  __v: number;
};

export type Message = {
  Msgid: string;
  sender: string;
  text: string;
  date: Date;
};
