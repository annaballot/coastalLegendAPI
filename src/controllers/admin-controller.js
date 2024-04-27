import { AdminCredentialsSpec } from "../models/joi-schemas.js";
import { adminUser } from "../models/adminHardcode.js";
import { db } from "../models/db.js";

export const adminController = {
  adminUserView: {
    auth: false,
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const viewData = {
        title: "Admin: View Users",
        users: users,
      };
      return h.view("admin-view-users", viewData);
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("admin-login-view", { title: "Login to CoastalLegend" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: AdminCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("admin-login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      await db.adminStore.deleteAllAdmins(); //delete all admins first so there's not duplicates
      await db.adminStore.addAdmin(adminUser);
      const { email, password } = request.payload;
      const admin = await db.adminStore.getAdminByEmail(email);
      if (!admin || admin.password !== password) {
        return h.redirect("/login");
      }
      request.cookieAuth.set({ id: admin._id });
      return h.redirect("/admin/users");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const admin = await db.adminStore.getAdminById(session.id);
    if (!admin) {
      return { isValid: false };
    }
    return { isValid: true, credentials: admin };
  },
};
