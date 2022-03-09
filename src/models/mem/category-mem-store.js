import { v4 } from "uuid";

let categorys = [];

export const categoryMemStore = {
  async getAllCategorys() {
    return categorys;
  },

  async addCategory(poiId, category) {
    category._id = v4();
    category.poiid = poiId;
    categorys.push(category);
    return category;
  },

  async getCategorysByPoiId(id) {
    return categorys.filter((category) => category.poiid === id);
  },

  async getCategoryById(id) {
    return categorys.find((category) => category._id === id);
  },

  async getPoiCategorys(poiId) {
    return categorys.filter((category) => category.poiid === poiId);
  },

  async deleteCategory(id) {
    const index = categorys.findIndex((category) => category._id === id);
    categorys.splice(index, 1);
  },

  async deleteAllCategorys() {
    categorys = [];
  },

  async updateCategory(category, updatedCategory) {
    category.title = updatedCategory.title;
    category.artist = updatedCategory.artist;
    category.duration = updatedCategory.duration;
  },
};