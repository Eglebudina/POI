import { db } from "../models/db.js";

export const poiController = {
  index: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      const viewData = {
        title: "Poi",
        poi: poi,
      };
      return h.view("poi-view", viewData);
    },
  },


  addCategory: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      const newCategory = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.categoryStore.addCategory(poi._id, newCategory);
      return h.redirect(`/poi/${poi._id}`);
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      await db.categoryStore.deleteCategory(request.params.categoryid);
      return h.redirect(`/poi/${poi._id}`);
    },
  },
};