import Mongoose from "mongoose";

/*
Point of Interest Schema stores the POIs name, description,
location: latitude and longitude, and its also pointing to the
user, category and images associated
*/

const { Schema } = Mongoose;

const poiSchema = new Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  },
});

export const Poi = Mongoose.model("Poi", poiSchema);