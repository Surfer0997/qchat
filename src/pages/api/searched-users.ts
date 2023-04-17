// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import userModel from '@/models/user.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoDB/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    switch (req.method) {
      //   case 'POST':
      //     const { myId, destId, messages } = req.body;

      //     const conversation = new conversationModel({
      //       members: [myId, destId],
      //       messages,
      //       date: new Date(),
      //     });

      //     await conversation.save();

      //     res.status(201).json(conversation);
      //     return;

      case 'GET': // route to get users from search
        const { searchString } = req.body;
        const users = await userModel.find({ nickname: { $regex: searchString, $options: 'i' } }); // 'i' option == case insensitive
        if (!users) {
          throw new Error('No users found, try other letters!');
        }

        res.status(200).json(users);
        break;

      //   case 'PATCH':
      //     const { targetConversationId, message } = JSON.parse(req.body); // maybe FIX
      //     const targetConversation = await conversationModel.findOneAndUpdate(
      //       targetConversationId,
      //       { $push: { messages: message } },
      //       { new: true }
      //     );
      //     if (!targetConversation) {
      //       throw new Error('No conversations found, an error occured');
      //     }
      //     res.status(200).json(targetConversation);

      //     break;
      default:
        throw new Error('Bad request');
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
