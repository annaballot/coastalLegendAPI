import { assert } from "chai";
import { db } from "../../src/models/db.js";
import {  testLists, testPlacemarks, fiona, anna, clonea , maggie} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

  let fionaList = null;

  setup(async () => {
    db.init("mongo");
    await db.listStore.deleteAllLists();
    await db.placemarkStore.deleteAllPlacemarks();
    const newUser = await db.userStore.addUser(maggie);
    fionaList = await db.listStore.addList(fiona);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(fionaList._id, newUser._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const annaList = await db.listStore.addList(anna);
    const newUser = await db.userStore.addUser(maggie);
    const placemark = await db.placemarkStore.addPlacemark(annaList._id, newUser._id, clonea)
    assert.isNotNull(placemark._id);
    assertSubset (clonea, placemark);
  });

  test("get multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getPlacemarksByListId(fionaList._id);
    assert.equal(placemarks.length, testPlacemarks.length)
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const annaList = await db.listStore.addList(anna);
    const newUser = await db.userStore.addUser(maggie);
    const placemark = await db.placemarkStore.addPlacemark(annaList._id, maggie._id, clonea)
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset (clonea, newPlacemark);
  });

  test("delete One Placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testLists.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
    assert.isNull(deletedPlacemark);
  });

  test("get an placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testLists.length);
  });
});