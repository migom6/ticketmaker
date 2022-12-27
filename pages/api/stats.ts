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
        const persons = await Person.find({});
        const payload = {
          registered: persons.length,
          visited: persons.filter((p) => p.visited).length,
          hadFood: persons.filter((p) => p.hadFood).length,
          includesFood: persons.filter((p) => p.includesFood).length,
        };
        res.status(200).json({ success: true, data: payload });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
