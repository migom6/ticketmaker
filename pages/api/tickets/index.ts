import dbConnect from "utils/db";
import Ticket from "models/Ticket";
import { NextApiRequest, NextApiResponse } from "next";
import { TicketType } from "app/generate/generate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const tickets = await Ticket.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: tickets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const payload: { data: TicketType[] } = req.body;
        const tickets = await Ticket.insertMany(
          payload.data
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: tickets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const tickets = await Ticket.deleteMany(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: tickets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
