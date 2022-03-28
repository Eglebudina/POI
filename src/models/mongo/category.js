import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  name: String,
  // img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  img: {
    type: Schema.Types.ObjectId,
    ref: "Image"
  }
});

export const Category = Mongoose.model("Category", categorySchema);
