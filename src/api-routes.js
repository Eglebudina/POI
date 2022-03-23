import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { placeApi } from "./api/place-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/categorys", config: categoryApi.create },
  { method: "DELETE", path: "/api/categorys", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categorys", config: categoryApi.find },
  { method: "GET", path: "/api/categorys/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categorys/{id}", config: categoryApi.deleteOne },

  { method: "GET", path: "/api/places", config: placeApi.find },
  { method: "GET", path: "/api/places/{id}", config: placeApi.findOne },
  { method: "POST", path: "/api/categorys/{id}/places", config: placeApi.create },
  { method: "DELETE", path: "/api/places", config: placeApi.deleteAll },
  { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne },
];
