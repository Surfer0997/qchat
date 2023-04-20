// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conversationModel from '@/models/conversation.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoDB/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    switch (req.method) {
      case 'PATCH':
        const { myId, destId, messages } = req.body;

        const conversation = new conversationModel({
          members: [myId, destId],
          messages,
          date: new Date(),
        });

        await conversation.save();

        res.status(201).json(conversation);
        return;

      default:
        throw new Error('Bad request');
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
