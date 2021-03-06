import { v4 } from "uuid";
import { placeMemStore } from "./place-mem-store.js";

let categorys = [];

export const categoryMemStore = {
  async getAllCategorys() {
    return categorys;
  },

  async addCategory(category) {
    category._id = v4();
    categorys.push(category);
    return category;
  },

  async getCategoryById(id) {
    const list = categorys.find((category) => category._id === id);
    if (list) {
      list.places = await placeMemStore.getPlacesByCategoryId(list._id);
      return list;
    }
    return null;
  },

  async getUserCategorys(userid) {
    return categorys.filter((category) => category.userid === userid);
  },

  async deleteCategoryById(id) {
    const index = categorys.findIndex((category) => category._id === id);
    if (index !== -1) categorys.splice(index, 1);
  },

  async deleteAllCategorys() {
    categorys = [];
  },
};
