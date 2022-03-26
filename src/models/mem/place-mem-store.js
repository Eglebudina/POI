import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(categoryId, place) {
    place._id = v4();
    place.categoryid = categoryId;
    places.push(place);
    return place;
  },

  async getPlacesByCategoryId(id) {
    return places.filter((place) => place.categoryid === id);
  },

  async getPlaceById(id) {
    let place = places.find((place) => place._id === id);
    if (place == undefined) {
      place = null;
    }
    return place;
  },

  async getCategoryPlaces(categoryId) {
    return places.filter((place) => place.categoryid === categoryId);
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    if (index !== -1) places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.description = updatedPlace.description;
    place.latitude = updatedPlace.latitude;
    place.longitude = updatedPlace.longitude;
  },
};
