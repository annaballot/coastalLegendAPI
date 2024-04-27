import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testAdmin } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Admin Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.adminStore.deleteAllAdmins();
    // for (let i = 0; i < testUsers.length; i += 1) {
    //   // eslint-disable-next-line no-await-in-loop
    //   testUsers[i] = await db.adminStore.addAdmin(testUsers[i]);
    // }
  });

  test("create a admin", async () => {
    const newAdmin = await db.adminStore.addAdmin(testAdmin);
    assertSubset(testAdmin, newAdmin);
  });

  test("get a admin - success", async () => {
    const admin = await db.adminStore.addAdmin(testAdmin);
    const returnedadmin1 = await db.adminStore.getAdminById(admin._id);
    assert.deepEqual(admin, returnedadmin1);
    const returnedadmin2 = await db.adminStore.getAdminByEmail(admin.email);
    assert.deepEqual(admin, returnedadmin2);
  });


  test("get a admin - bad params", async () => {
    assert.isNull(await db.adminStore.getAdminByEmail(""));
    assert.isNull(await db.adminStore.getAdminById(""));
    assert.isNull(await db.adminStore.getAdminById());
  });


});
