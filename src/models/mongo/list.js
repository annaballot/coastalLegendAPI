import Mongoose from "mongoose";

const { Schema } = Mongoose;

const listSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const List = Mongoose.model("List", listSchema);
