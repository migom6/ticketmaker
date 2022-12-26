import dbConnect from "utils/db";
import Person from "models/Person";
import { NextApiRequest, NextApiResponse } from "next";

export interface PersonType {
  ticketNo: number;
  name: string;
  visited: boolean;
  includesFood: boolean;
  hadFood: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const person = await Person.find({});
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const payload: { data: PersonType[] } = req.body;
        const tickets = await Person.insertMany(
          payload.data
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: tickets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
