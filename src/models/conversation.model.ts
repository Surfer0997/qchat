import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import createModel from '../lib/mongoDB/createModel';

interface ConversationInput {
  members: String[];
  name: string;
  messages: {
    sender: String;
    text: String;
    date: Date;
  }[];
  date: Date;
}
interface ConversationDocument extends ConversationInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new mongoose.Schema({
  members: {
    type: [Schema.Types.ObjectId],
    ref:'user',
    default:'sadasdasd',
    required: true,
  },
  messages: {
    type: [
        {
          Msgid: String,
          sender: String,
          text: String,
          date: Date,
        },
      ],
      default: []
  },
  name: {
    type: String,
  },
  order: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});


export default createModel<ConversationDocument>('Conversation', conversationSchema);
