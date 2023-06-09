// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import userModel from '@/models/user.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoDB/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    switch (req.method) {
      case 'GET': // route to get users from search
        const users = await userModel.find() // 'i' option == case insensitive
        if (!users) {
          throw new Error('No users found, try other letters!');
        }
        res.status(200).json(users.map((user)=>{
            return {
                nickname: user.nickname,
                _id: user._id
            }
        }));
        break;

      default:
        throw new Error('Bad request');
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
