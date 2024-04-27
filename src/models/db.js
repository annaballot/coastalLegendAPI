import { userMemStore } from "./mem/user-mem-store.js";
import { listMemStore } from "./mem/list-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { listJsonStore } from "./json/list-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { listMongoStore } from "./mongo/list-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { adminMongoStore } from "./mongo/admin-mongo-store.js";

export const db = {
  userStore: null,
  listStore: null,
  placemarkStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.listStore = listJsonStore;
        this.placemarkStore = placemarkJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.listStore = listMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.adminStore = adminMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.listStore = listMemStore;
        this.placemarkStore = placemarkMemStore;
    }
  }
};
