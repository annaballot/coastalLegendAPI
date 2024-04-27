import Mongoose from "mongoose";

const { Schema } = Mongoose;

const adminSchema = new Schema({
  email: String,
  password: String,
});

export const Admin = Mongoose.model("Admin", adminSchema);
