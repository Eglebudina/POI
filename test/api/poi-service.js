import axios from "axios";

import { serviceUrl } from "../fixtures.js";

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
    const res = await axios.get(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async createPoi(poi) {
    const res = await axios.post(`${this.poiUrl}/api/pois`, poi);
    return res.data;
  },

  async deleteAllPois() {
    const response = await axios.delete(`${this.poiUrl}/api/pois`);
    return response.data;
  },

  async deletePoi(id) {
    const response = await axios.delete(`${this.poiUrl}/api/pois/${id}`);
    return response;
  },

  async getAllPois() {
    const res = await axios.get(`${this.poiUrl}/api/pois`);
    return res.data;
  },

  async getpoi(id) {
    const res = await axios.get(`${this.poiUrl}/api/pois/${id}`);
    return res.data;
  },
};