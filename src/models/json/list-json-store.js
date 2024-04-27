import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const listJsonStore = {
  async getAllLists() {
    await db.read();
    return db.data.lists;
  },

  async addList(list) {
    await db.read();
    list._id = v4();
    db.data.lists.push(list);
    await db.write();
    return list;
  },

  async getListById(id) {
    await db.read();
    let currentList = db.data.lists.find((list) => list._id === id);
    if (currentList) {
      currentList.placemarks = await placemarkJsonStore.getPlacemarksByListId(currentList._id);
    } else {
      currentList = null;
    }
    return currentList;
  },

  async getUserLists(userid) {
    await db.read();
    return db.data.lists.filter((list) => list.userid === userid);
  },

  async deleteListById(id) {
    await db.read();
    const index = db.data.lists.findIndex((list) => list._id === id);
    if (index !== -1) db.data.lists.splice(index, 1);
    await db.write();
  },

  async deleteAllLists() {
    db.data.lists = [];
    await db.write();
  },
};