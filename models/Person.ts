import mongoose, { Document, model, Model, Schema } from "mongoose";
import { PersonType } from "pages/api/persons";
import { ElementMeta } from "stores/controller";

export interface PersonDB extends PersonType, Document {}

const PersonSchema: Schema = new Schema({
  ticketNo: {
    type: Number,
  },
  name: {
    type: String,
  },
  visited: {
    type: Boolean,
  },
  includesFood: {
    type: Boolean,
  },
  hadFood: {
    type: Boolean,
  },
});

const Person: Model<PersonDB> =
  mongoose.models.Person || model("Person", PersonSchema);

export default Person;
