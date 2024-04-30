import { UserSpec, UserCredentialsSpec, PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to CoastalLegend" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for CoastalLegend" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to CoastalLegend" });
    },
  },
  deleteUser: {
    auth: false,
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admin/users");
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },




  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add placemark error", errors: error.details }).takeover().code(400);
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
      };
      await db.placemarkStore.addPlacemark(loggedInUser._id, newPlacemark);
      return h.redirect(`/list/${list._id}`);
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect(`/list/${list._id}`);
    },
  },

};
