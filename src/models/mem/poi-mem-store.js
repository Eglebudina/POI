import { v4 } from "uuid";
import { categoryMemStore } from "./category-mem-store.js";

let pois = [];

export const poiMemStore = {
  async getAllPois() {
    return pois;
  },

  async addPoi(poi) {
    poi._id = v4();
    pois.push(poi);
    return poi;
  },

  async getPoiById(id) {
    const list = pois.find((poi) => poi._id === id);
    list.categories = await categoryMemStore.getCategoriesByPoiId(list._id);
    return list;
  },

  async deletePoiById(id) {
    const index = pois.findIndex((poi) => poi._id === id);
    pois.splice(index, 1);
  },

  async deleteAllPois() {
    pois = [];
  },
};