import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const categoryService = {
  categoryUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.categoryUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.categoryUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.categoryUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.categoryUrl}/api/users`);
    return res.data;
  },

  async createCategory(category) {
    const res = await axios.post(`${this.categoryUrl}/api/categorys`, category);
    return res.data;
  },

  async deleteAllCategorys() {
    const response = await axios.delete(`${this.categoryUrl}/api/categorys`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.categoryUrl}/api/categorys/${id}`);
    return response;
  },

  async getAllCategorys() {
    const res = await axios.get(`${this.categoryUrl}/api/categorys`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.categoryUrl}/api/categorys/${id}`);
    return res.data;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.categoryUrl}/api/places`);
    return res.data;
  },

  async createPlace(id, place) {
    const res = await axios.post(`${this.categoryUrl}/api/categorys/${id}/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const res = await axios.delete(`${this.categoryUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.categoryUrl}/api/places/${id}`);
    return res.data;
  },

  async deletePlace(id) {
    const res = await axios.delete(`${this.categoryUrl}/api/places/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.categoryUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
