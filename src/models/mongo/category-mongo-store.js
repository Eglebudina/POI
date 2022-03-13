import { Category } from "./category.js";

export const categoryMongoStore = {
  async getCategorys() {
    const categorys = await Category.find().lean();
    return categorys;
  },

  async addCategory(poiId, category) {
    category.poiid = poiId;
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getCategorysByPoiId(id) {
    const categorys = await Category.find({ poiid: id }).lean();
    return categorys;
  },

  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      return category;
    }
    return null;
  },

  async deleteCategory(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategorys() {
    await Category.deleteMany({});
  },

  async updateCategory(category, updatedCategory) {
    category.name = updatedCategory.name;
    await category.save();
  },

};