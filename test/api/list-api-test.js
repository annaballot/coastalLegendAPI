import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, anna, testLists } from "../fixtures.js";

suite("List API tests", () => {

  let user = null;

  setup(async () => {
    await playtimeService.deleteAllLists();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    anna.userid = user._id;
  });

  teardown(async () => {});

  test("create list", async () => {
    const returnedList = await playtimeService.createList(anna);
    assert.isNotNull(returnedList);
    assertSubset(anna, returnedList);
  });

  test("delete a list", async () => {
    const list = await playtimeService.createList(anna);
    const response = await playtimeService.deleteList(list._id);
    assert.equal(response.status, 204);
    try {
      const returnedList = await playtimeService.getList(list.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No List with this id", "Incorrect Response Message");
    }
  });

  test("create multiple lists", async () => {
    for (let i = 0; i < testLists.length; i += 1) {
      testLists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createList(testLists[i]);
    }
    let returnedLists = await playtimeService.getAllLists();
    assert.equal(returnedLists.length, testLists.length);
    await playtimeService.deleteAllLists();
    returnedLists = await playtimeService.getAllLists();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant list", async () => {
    try {
      const response = await playtimeService.deleteList("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No List with this id", "Incorrect Response Message");
    }
  });
});