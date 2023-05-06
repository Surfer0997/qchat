// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conversationModel from '@/models/conversation.model';
import userModel from '@/models/user.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoDB/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    switch (req.method) {

      case 'POST':
        const { members } = req.body;
        const userConversations = await conversationModel.find({ members: {$contains: members[0]} }).populate('members', '_id nickname', userModel); // MAGIC
        if (!userConversations) {
          throw new Error('No conversations found, or an error occured');
        }

        res.status(200).json(userConversations);
        break;

      default:
        throw new Error('Bad request');
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
