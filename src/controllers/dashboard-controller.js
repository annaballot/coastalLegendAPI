import { ListSpec } from "../models/joi-schemas.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      const viewData = {
        title: "List",
        placemarks: placemarks,
        loggedInUser: loggedInUser,
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


  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("list-view", { title: "Add placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacemark = {
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        rating: Number(request.payload.rating),
        img: "",
      };
      await db.placemarkStore.addPlacemark(loggedInUser._id, newPlacemark);
      return h.redirect("/dashboard");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect("/dashboard");
    },
  },


  addPlacemarkImg: {
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          await db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect("/dashboard");
      } catch (err) {
        console.log(err);
        return h.redirect("/dashboard");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },




};
