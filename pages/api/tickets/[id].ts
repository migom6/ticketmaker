import dbConnect from "utils/db";
import Ticket from "models/Ticket";
import { NextApiRequest, NextApiResponse } from "next";
import { TicketType } from "app/generate/generate";

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
        const ticket = await Ticket.findOne({
          id: id,
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: ticket });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const payload: { data: TicketType } = req.body;
        const ticket = await Ticket.create(payload.data);
        res.status(201).json({ success: true, data: ticket });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const ticket = await Ticket.deleteOne({
          id: id,
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: ticket });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
