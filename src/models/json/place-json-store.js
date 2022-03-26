import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(categoryId, place) {
    await db.read();
    place._id = v4();
    place.categoryid = categoryId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByCategoryId(id) {
    await db.read();
    return db.data.places.filter((place) => place.categoryid === id);
  },

  async getPlaceById(id) {
    await db.read();
    let place = db.data.places.find((place) => place._id === id);
    if (place == undefined) {
      place = null;
    }
    return place
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    if (index !== -1) db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name
    place.description = updatedPlace.description;
    place.latitude = updatedPlace.latitude;
    place.longitude = updatedPlace.longitude;
    await db.write();
  },
};
