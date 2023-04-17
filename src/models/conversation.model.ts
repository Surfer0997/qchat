import mongoose from 'mongoose';
import createModel from '../lib/mongoDB/createModel';

interface ConversationInput {
  members: String[];
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
    type: [String],
    required: true,
  },
  messages: {
    type: [
        {
          sender: String,
          text: String,
          date: Date,
        },
      ],
      default: []
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// @ts-ignore
export default createModel<ConversationDocument>('Conversation', conversationSchema);
