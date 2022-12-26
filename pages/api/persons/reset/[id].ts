import dbConnect from "utils/db";
import Person from "models/Person";
import { NextApiRequest, NextApiResponse } from "next";
import entries from "models/entry.json";
import { PersonType } from "..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const person = await Person.findOneAndUpdate(
          { ticketNo: id },
          { ...defaultPayload(parseInt(id as string)) }
        );
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

const defaultPayload = (ticketNo: number): PersonType => {
  const entry = entries.find((e) => e.No === ticketNo);
  if (!entry)
    return {
      hadFood: false,
      includesFood: false,
      name: "",
      ticketNo: 0,
      visited: false,
    };

  return {
    ticketNo: entry.No,
    name: entry.Name,
    includesFood: entry["Ticket Price"] === 200,
    hadFood: false,
    visited: false,
  };
};
