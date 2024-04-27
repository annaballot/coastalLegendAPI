import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(listId, placemark) {
    placemark._id = v4();
    placemark.listid = listId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByListId(id) {
    let foundPlacemarks = placemarks.filter((placemark) => placemark.listid === id);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async getPlacemarkById(id) {
    let foundPlacemark = placemarks.find((placemark) => placemark._id === id);
    if (!foundPlacemark) {
      foundPlacemark = null;
    }
    return foundPlacemark;
  },

  async getListPlacemarks(listId) {
    let foundPlacemarks = placemarks.filter((placemark) => placemark.listid === listId);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.name = updatedPlacemark.name;
    placemark.description = updatedPlacemark.description;
    placemark.category = updatedPlacemark.category;
    placemark.latitude = updatedPlacemark.latitude;
    placemark.longitude = updatedPlacemark.longitude;
  },
};
