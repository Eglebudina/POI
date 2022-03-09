import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/categorys.json"));
db.data = { categorys: [] };

export const categoryJsonStore = {
  async getAllCategorys() {
    await db.read();
    return db.data.categorys;
  },

  async addCategory(PoiId, category) {
    await db.read();
    category._id = v4();
    category.poiid = PoiId;
    db.data.categorys.push(category);
    await db.write();
    return category;
  },

  async getCategorysByPoiId(id) {
    await db.read();
    return db.data.categorys.filter((category) => category.poiid === id);
  },

  async getCategoryById(id) {
    await db.read();
    return db.data.categorys.find((category) => category._id === id);
  },

  async deleteCategory(id) {
    await db.read();
    const index = db.data.categorys.findIndex((category) => category._id === id);
    db.data.categorys.splice(index, 1);
    await db.write();
  },

  async deleteAllCategorys() {
    db.data.categorys = [];
    await db.write();
  },

  async updateCategory(category, updatedCategory) {
    category.title = updatedCategory.title;
    category.artist = updatedCategory.artist;
    category.duration = updatedCategory.duration;
    await db.write();
  },
};
