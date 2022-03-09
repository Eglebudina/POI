import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { categoryJsonStore } from "./category-json-store.js";

const db = new Low(new JSONFile("./src/models/json/pois.json"));
db.data = { pois: [] };

export const poiJsonStore = {
  async getAllPois() {
    await db.read();
    return db.data.pois;
  },

  async addPoi(poi) {
    await db.read();
    poi._id = v4();
    db.data.pois.push(poi);
    await db.write();
    return poi;
  },

  async getPoiById(id) {
    await db.read();
    const list = db.data.pois.find((poi) => poi._id === id);
    list.categorys = await categoryJsonStore.getCategorysByPoiId(list._id);
    return list;
  },

  async getUserPois(userid) {
    await db.read();
    return db.data.pois.filter((poi) => poi.userid === userid);
  },

  async deletePoiById(id) {
    await db.read();
    const index = db.data.pois.findIndex((poi) => poi._id === id);
    db.data.pois.splice(index, 1);
    await db.write();
  },

  async deleteAllPois() {
    db.data.pois = [];
    await db.write();
  },
};
