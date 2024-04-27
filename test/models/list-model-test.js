import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLists, anna } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("List Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.listStore.deleteAllLists();
    for (let i = 0; i < testLists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLists[i] = await db.listStore.addList(testLists[i]);
    }
  });

  test("create a list", async () => {
    const list = await db.listStore.addList(anna);
    assertSubset(anna, list);
    assert.isDefined(list._id);
  });

  test("delete all lists", async () => {
    let returnedLists = await db.listStore.getAllLists();
    assert.equal(returnedLists.length, 3);
    await db.listStore.deleteAllLists();
    returnedLists = await db.listStore.getAllLists();
    assert.equal(returnedLists.length, 0);
  });

  test("get a list - success", async () => {
    const list = await db.listStore.addList(anna);
    const returnedList = await db.listStore.getListById(list._id);
    assertSubset(anna, list);
  });

  test("delete One List - success", async () => {
    const id = testLists[0]._id;
    await db.listStore.deleteListById(id);
    const returnedLists = await db.listStore.getAllLists();
    assert.equal(returnedLists.length, testLists.length - 1);
    const deletedList = await db.listStore.getListById(id);
    assert.isNull(deletedList);
  });

  test("get a list - bad params", async () => {
    assert.isNull(await db.listStore.getListById(""));
    assert.isNull(await db.listStore.getListById());
  });

  test("delete One List - fail", async () => {
    await db.listStore.deleteListById("bad-id");
    const allLists = await db.listStore.getAllLists();
    assert.equal(testLists.length, allLists.length);
  });
});
