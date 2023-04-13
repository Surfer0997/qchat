// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import userModel from "@/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoDB/dbConnect";
import userService from '../../services/user.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    switch (req.method) {
      // case "GET":
      //   const users:any = await userModel.find();
      //   res.status(200).json(users)
      case "POST":
        const {nickname, password} = req.body;
        const user = new userModel({
          nickname,
          password,
          date: new Date(),
        });
    
        // The intellisense will detect the fullName Method
        const name = user.fullName();
        const nicknameIsTaken = await userService.nicknameTaken(nickname);
        if (nicknameIsTaken) res.status(400).json({msg:"This nickname is already taken"})
        await user.save();
    
        res.status(201).json(user);
        return;
        break;
      default:
        throw new Error('Bad request')
    }
    
  } catch (err:any) {
    res.status(400).json(err.message);
  }
}
