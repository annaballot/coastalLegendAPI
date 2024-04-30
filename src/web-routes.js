import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { listController } from "./controllers/list-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/admin/login", config: adminController.showLogin },
  { method: "POST", path: "/admin/authenticate", config: adminController.login },
  { method: "GET", path: "/admin/logout", config: adminController.logout },
  { method: "GET", path: "/admin/users", config: adminController.adminUserView },  
  { method: "GET", path: "/admin/users/deleteuser/{id}", config: accountsController.deleteUser },


  { method: "GET", path: "/about", config: aboutController.index },

  // { method: "GET", path: "/dashboard", config: dashboardController.index },
  // { method: "POST", path: "/dashboard/addlist", config: dashboardController.addList },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/dashboard/deletelist/{id}", config: dashboardController.deleteList },
  { method: "GET", path: "/dashboard/allPlacemarks", config: dashboardController.showAllPlacemarks },
  { method: "GET", path: "/dashboard/categories", config: dashboardController.filterPlacemarks },
  { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },
  { method: "GET", path: "/dashboard/deleteplacemark/{placemarkid}", config: dashboardController.deletePlacemark },


  { method: "POST", path: "/dashboard/addPlacemarkImg/{id}", config: dashboardController.addPlacemarkImg },


  // { method: "GET", path: "/list/{id}", config: listController.index },
  // { method: "POST", path: "/list/{id}/addplacemark", config: listController.addPlacemark },
  // { method: "GET", path: "/list/{id}/deleteplacemark/{placemarkid}", config: listController.deletePlacemark },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];
