import dbConnect from "utils/db";
import Person from "models/Person";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const person = await Person.findOne({ ticketNo: id });
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const person = await Person.findOneAndUpdate(
          { ticketNo: id },
          { ...body }
        );
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, data: error });
      }
      break;
    case "DELETE":
      try {
        const person = await Person.deleteOne({
          ticketNo: id,
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
