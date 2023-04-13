const jwt = require('jsonwebtoken');
import type { NextApiRequest, NextApiResponse } from "next";

export const authenticate = (req:NextApiRequest, res:NextApiResponse):any => {
    const token = req.cookies['x-access-token'];
    let decodedNick = undefined as string | undefined;
   jwt.verify(token, process.env.DB_SECRET, (err:any, decode:any)=>{
        // if(!decode) res.status(401).send({message:'Bad token'}) 
        if(!decode) return undefined;
        decodedNick = decode.nickname;
    });
    return decodedNick
};