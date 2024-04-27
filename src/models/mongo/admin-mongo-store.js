import { Admin } from "./admin.js";

export const adminMongoStore = {
  
  async getAdminById(id) {
    if (id) {
      const admin = await Admin.findOne({ _id: id }).lean();
      return admin;
    }
    return null;
  },

  async getAdminByEmail(email) {
    const admin = await Admin.findOne({ email: email }).lean();
    return admin;
  },

  async addAdmin(admin) {
    const newAdmin = new Admin(admin);
    const adminObj = await newAdmin.save();
    const u = await this.getAdminById(adminObj._id);
    return u;
  },

  async deleteAllAdmins() {
    await Admin.deleteMany({});
  }

};
