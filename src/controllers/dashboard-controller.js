import { ListSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      
      const lists = await db.listStore.getUserLists(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        lists: lists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  showAllPlacemarks: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      // const loggedInUserID = loggedInUser._id;
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      const viewData = {
        title: "List",
        placemarks: placemarks,
        loggedInUser: loggedInUser,
      };
      return h.view("all-placemarks-view", viewData);
    },
  },

  filterPlacemarks: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      // const loggedInUserID = loggedInUser._id;
      const category = request.query.category;
      const placemarks = await db.placemarkStore.getPlacemarksByCategory(loggedInUser._id, category);
      const viewData = {
        title: "List",
        placemarks: placemarks,
        loggedInUser: loggedInUser,
      };
      return h.view("all-placemarks-view", viewData);
    },
  },

  addList: {
    validate: {
      payload: ListSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add List error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlayList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.listStore.addList(newPlayList);
      return h.redirect("/dashboard");
    },
  },

  deleteList: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      await db.listStore.deleteListById(list._id);
      return h.redirect("/dashboard");
    },
  },


};
