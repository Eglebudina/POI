import { Category } from "./category.js";

export const categoryMongoStore = {
  async getCategorysByPoiId(id) {
    const categorys = await Category.find({ poiid: id }).lean();
    return categorys;
  },
};