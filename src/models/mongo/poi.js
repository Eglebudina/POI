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
});

export const Playlist = Mongoose.model("Playlist", poiSchema);