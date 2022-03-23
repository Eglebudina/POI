import Mongoose from "mongoose";
/*
Image Schema stores images public id, url and points to
the Category associated with
 */
const { Schema } = Mongoose;

const imageSchema = new Schema({
  public_id: String,
  url: String,
  poiid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Image = Mongoose.model("Image", imageSchema);