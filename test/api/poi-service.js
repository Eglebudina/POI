import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const poiService = {
  poiUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.poiUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.poiUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.poiUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async createPoi(category) {
    const res = await axios.post(`${this.poiUrl}/api/places`, category);
    return res.data;
  },

  async deleteAllPois() {
    const response = await axios.delete(`${this.poiUrl}/api/places`);
    return response.data;
  },

  async deletePoi(id) {
    const response = await axios.delete(`${this.poiUrl}/api/places/${id}`);
    return response;
  },

  async getAllPois() {
    const res = await axios.get(`${this.poiUrl}/api/places`);
    return res.data;
  },

  async getpoi(id) {
    const res = await axios.get(`${this.poiUrl}/api/places/${id}`);
    return res.data;
  },

  async getAllCategorys() {
    const res = await axios.get(`${this.poiUrl}/api/categorys`);
    return res.data;
  },

  async createCategory(id, place) {
    const res = await axios.post(`${this.poiUrl}/api/playlists/${id}/categorys`, place);
    return res.data;
  },

  async deleteAllCategorys() {
    const res = await axios.delete(`${this.poiUrl}/api/categorys`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.poiUrl}/api/categorys/${id}`);
    return res.data;
  },

  async deleteCategory(id) {
    const res = await axios.delete(`${this.poiUrl}/api/categorys/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.playtimeUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
