import { Request, Response } from "express";
import Message from "../models/MessageModel";

export const getMsg = async(req:Request,res:Response)=>{
    const msg=await Message.find().populate("sender")
    res.json(msg)
}