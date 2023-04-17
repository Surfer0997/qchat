// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conversationModel from '@/models/conversation.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoDB/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    switch (req.method) {
      case 'POST':
        const { myId, destId, messages } = req.body;

        const conversation = new conversationModel({
          members: [myId, destId],
          messages,
          date: new Date(),
        });

        await conversation.save();

        res.status(201).json(conversation);
        return;

      case 'GET':
        const { userId } = req.body;
        const userConversations = await conversationModel.find({ members: userId });
        if (!userConversations) {
          throw new Error('No conversations found, or an error occured');
        }

        res.status(200).json(userConversations);
        break;

      case 'PATCH':
        const { targetConversationId, message } = JSON.parse(req.body); // maybe FIX
        const targetConversation = await conversationModel.findOneAndUpdate(
          targetConversationId,
          { $push: { messages: message } },
          { new: true }
        );
        if (!targetConversation) {
          throw new Error('No conversations found, an error occured');
        }
        res.status(200).json(targetConversation);

        break;
      default:
        throw new Error('Bad request');
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
