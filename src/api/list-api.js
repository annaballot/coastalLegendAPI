// import Boom from "@hapi/boom";
// import { IdSpec, ListArraySpec, ListSpec, ListSpecPlus } from "../models/joi-schemas.js";
// import { db } from "../models/db.js";
// import { validationError } from "./logger.js";

// export const listApi = {
//   find: {
//     auth: {
//       strategy: "jwt",
//     },
//     handler: async function (request, h) {
//       try {
//         const lists = await db.listStore.getAllLists();
//         return lists;
//       } catch (err) {
//         return Boom.serverUnavailable("Database Error");
//       }
//     },
//     tags: ["api"],
//     response: { schema: ListArraySpec, failAction: validationError },
//     description: "Get all lists",
//     notes: "Returns all lists",
//   },

//   findOne: {
//     auth: {
//       strategy: "jwt",
//     },
//     async handler(request) {
//       try {
//         const list = await db.listStore.getListById(request.params.id);
//         if (!list) {
//           return Boom.notFound("No List with this id");
//         }
//         return list;
//       } catch (err) {
//         return Boom.serverUnavailable("No List with this id");
//       }
//     },
//     tags: ["api"],
//     description: "Find a list",
//     notes: "Returns a list",
//     validate: { params: { id: IdSpec }, failAction: validationError },
//     response: { schema: ListSpecPlus, failAction: validationError },
//   },

//   create: {
//     auth: {
//       strategy: "jwt",
//     },
//     handler: async function (request, h) {
//       try {
//         const list = request.payload;
//         const newList = await db.listStore.addList(list);
//         if (newList) {
//           return h.response(newList).code(201);
//         }
//         return Boom.badImplementation("error creating list");
//       } catch (err) {
//         return Boom.serverUnavailable("Database Error");
//       }
//     },
//     tags: ["api"],
//     description: "Create a List",
//     notes: "Returns the newly created list",
//     validate: { payload: ListSpec, failAction: validationError },
//     response: { schema: ListSpecPlus, failAction: validationError },
//   },

//   deleteOne: {
//     auth: {
//       strategy: "jwt",
//     },
//     handler: async function (request, h) {
//       try {
//         const list = await db.listStore.getListById(request.params.id);
//         if (!list) {
//           return Boom.notFound("No List with this id");
//         }
//         await db.listStore.deleteListById(list._id);
//         return h.response().code(204);
//       } catch (err) {
//         return Boom.serverUnavailable("No List with this id");
//       }
//     },
//     tags: ["api"],
//     description: "Delete a list",
//     validate: { params: { id: IdSpec }, failAction: validationError },
//   },

//   deleteAll: {
//     auth: {
//       strategy: "jwt",
//     },
//     handler: async function (request, h) {
//       try {
//         await db.listStore.deleteAllLists();
//         return h.response().code(204);
//       } catch (err) {
//         return Boom.serverUnavailable("Database Error");
//       }
//     },
//     tags: ["api"],
//     description: "Delete all ListApi",
//   },
// };