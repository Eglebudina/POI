import { Category } from "./category.js";
import { placeMongoStore } from "./place-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategorys() {
    const categorys = await Category.find().lean();
    return categorys;
  },

  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.places = await placeMongoStore.getPlacesByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getUserCategorys(id) {
    const category = await Category.find({ userid: id }).lean();
    return category;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategorys() {
    await Category.deleteMany({});
  }
};
