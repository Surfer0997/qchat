// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import userModel from '@/models/user.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoDB/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    switch (req.method) {
      case 'POST': // route to get users from search
      const { searchString } = req.body;
        const users = await userModel.find({ nickname: { $regex: searchString, $options: 'i' } }); // 'i' option == case insensitive
        if (!users) {
          throw new Error('No users found, try other letters!');
        }
        res.status(200).json(users);
        break;

        case 'GET': // route to get users from search
        const allUsers = await userModel.find().select('nickname');
        if (!allUsers) {
          throw new Error('No users found, try other letters!');
        }
        res.status(200).json(allUsers);
        break;

      default:
        throw new Error('Bad request');
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
