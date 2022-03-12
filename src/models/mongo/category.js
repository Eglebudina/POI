import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  name: String,
  poiid: {
    type: Schema.Types.ObjectId,
    ref: "Poi",
  },
});

export const Category = Mongoose.model("Category", categorySchema);