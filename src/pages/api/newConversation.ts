// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conversationModel from '@/models/conversation.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoDB/dbConnect';
import userModel from '@/models/user.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    switch (req.method) {
      case 'POST':

        const { myId, destId, messages, order } = req.body;
  
        const conversation = new conversationModel({
          members: [myId, destId],
          messages,
          date: new Date(),
          order
        });
 
        await conversation.save();
        
        const populatedConversation = await conversationModel.findById(conversation._id).populate('members', '_id nickname', userModel);

        res.status(201).json(populatedConversation);
        return;

      default:
        throw new Error('Bad request');
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
