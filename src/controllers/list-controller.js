import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const listController = {
  index: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      const viewData = {
        title: "List",
        list: list,
      };
      return h.view("list-view", viewData);
    },
  },

  // addPlacemark: {
  //   validate: {
  //     payload: PlacemarkSpec,
  //     options: { abortEarly: false },
  //     failAction: function (request, h, error) {
  //       return h.view("list-view", { title: "Add placemark error", errors: error.details }).takeover().code(400);
  //     },
  //   },
  //   handler: async function (request, h) {
  //     const loggedInUser = request.auth.credentials;
  //     const list = await db.listStore.getListById(request.params.id);
  //     const newPlacemark = {
  //       name: request.payload.name,
  //       category: request.payload.category,
  //       description: request.payload.description,
  //       latitude: Number(request.payload.latitude),
  //       longitude: Number(request.payload.longitude),
  //     };
  //     await db.placemarkStore.addPlacemark(list._id, loggedInUser._id, newPlacemark);
  //     return h.redirect(`/list/${list._id}`);
  //   },
  // },

  // deletePlacemark: {
  //   handler: async function (request, h) {
  //     const list = await db.listStore.getListById(request.params.id);
  //     await db.placemarkStore.deletePlacemark(request.params.placemarkid);
  //     return h.redirect(`/list/${list._id}`);
  //   },
  // },
};
