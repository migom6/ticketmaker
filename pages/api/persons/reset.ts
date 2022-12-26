import dbConnect from "utils/db";
import Person from "models/Person";
import { NextApiRequest, NextApiResponse } from "next";
import entries from "models/entry.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await Person.deleteMany({});
        const payload = entries.map((e) => ({
          ticketNo: e.No,
          name: e.Name,
          visited: false,
          includesFood: e["Ticket Price"] === 200,
          hadFood: false,
        }));
        const tickets = await Person.insertMany(payload);
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
