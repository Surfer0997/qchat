// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import userModel from "@/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoDB/dbConnect";
import { setCookie } from "cookies-next";
import { authenticate } from "@/lib/middlewares/auth.middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    switch (req.method) {
      case "GET":
        const nicknameToSignIn = authenticate(req);
        if (!nicknameToSignIn) {
          res.status(401).send({message:'Bad token'});
          return;
        }
        const signedInUser = await userModel.findOne({nickname: nicknameToSignIn});
        if (!signedInUser) {
          throw new Error(
            "No user with this email, but you exist and this is beautiful"
          );
        }

        res.status(200).json(signedInUser);
        break;
      case "POST":
        // const { nickname, password } = JSON.parse(req.body);
        const { nickname, password } = req.body;
        const user = await userModel.findOne({ nickname });
        if (!user) {
          throw new Error(
            "No user with this email, but you exist and this is beautiful"
          );
        }
        if (!await user.comparePassword(password)) {
          throw new Error("Bad password");
        }
        setCookie("x-access-token", user.generateAuthToken(), {
          req,
          res,
          maxAge: 60 * 60 * 24,
        });
        res.status(200).json(user); // valid email & password => user is logged in
        break;
      default:
        throw new Error("Bad request");
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
