import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async createList(list) {
    const res = await axios.post(`${this.playtimeUrl}/api/lists`, list);
    return res.data;
  },

  async deleteAllLists() {
    const response = await axios.delete(`${this.playtimeUrl}/api/lists`);
    return response.data;
  },

  async deleteList(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/lists/${id}`);
    return response;
  },

  async getAllLists() {
    const res = await axios.get(`${this.playtimeUrl}/api/lists`);
    return res.data;
  },

  async getList(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/lists/${id}`);
    return res.data;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.playtimeUrl}/api/placemarks`);
    return res.data;
  },

  async createPlacemark(id, placemark) {
    const res = await axios.post(`${this.playtimeUrl}/api/lists/${id}/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const res = await axios.delete(`${this.playtimeUrl}/api/placemarks`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async deletePlacemark(id) {
    const res = await axios.delete(`${this.playtimeUrl}/api/placemarks/${id}`);
    return res.data;
  },





  
};