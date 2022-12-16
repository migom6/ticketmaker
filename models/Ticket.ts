import mongoose, { Document, model, Model, Schema } from "mongoose";
import { ElementMeta } from "stores/controller";

export interface TicketDB extends Document {
  elements: ElementMeta[];
  row: string[];
  imageUrl: string;
  templateHeight: number;
  templateWidth: number;
}

const TicketSchema: Schema = new Schema({
  elements: {
    type: [Object],
  },
  row: {
    type: [String],
  },
  imageUrl: {
    type: String,
  },
  templateHeight: {
    type: Number,
  },
  templateWidth: {
    type: Number,
  },
});

const Ticket: Model<TicketDB> =
  mongoose.models.Ticket || model("Ticket", TicketSchema);

export default Ticket;
