import Mongoose from "mongoose";
/*
Image Schema stores images public id, url and points to
the Poi associated with
 */
const { Schema } = Mongoose;

const imageSchema = new Schema({
  public_id: String,
  url: String,
  poiid: {
    type: Schema.Types.ObjectId,
    ref: "Poi",
  },
});

export const Image = Mongoose.model("Image", imageSchema);