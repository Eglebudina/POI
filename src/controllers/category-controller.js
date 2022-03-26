import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        name: "Category",
        category: category,
      };
      return h.view("category-view", viewData);
    },
  },

  addPlace: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("category-view", { name: "Add place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newPlace = {
        name: request.payload.name,
        description: request.payload.name,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.placeStore.addPlace(category._id, newPlace);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deletePlace: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
