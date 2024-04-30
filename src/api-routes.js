import { userApi } from "./api/user-api.js";

import { placemarkApi } from "./api/placemark-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  // { method: "POST", path: "/api/lists", config: listApi.create },
  // { method: "DELETE", path: "/api/lists", config: listApi.deleteAll },
  // { method: "GET", path: "/api/lists", config: listApi.find },
  // { method: "GET", path: "/api/lists/{id}", config: listApi.findOne },
  // { method: "DELETE", path: "/api/lists/{id}", config: listApi.deleteOne },

  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
];