import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { playtimeService } from "./playtime-service.js";
import { maggie, anna, testLists, testPlacemarks, clonea } from "../fixtures.js";

suite("Placemark API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    await playtimeService.deleteAllLists();
    await playtimeService.deleteAllUsers();
    await playtimeService.deleteAllPlacemarks();
    user = await playtimeService.createUser(maggie);
    anna.userid = user._id;
    beethovenSonatas = await playtimeService.createList(anna);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await playtimeService.createPlacemark(beethovenSonatas._id, clonea);
    assertSubset(clonea, returnedPlacemark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    const returnedPlacemarks = await playtimeService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await playtimeService.getPlacemark(returnedPlacemarks[i]._id);
      assertSubset(placemark, returnedPlacemarks[i]);
    }
  });

  test("Delete PlacemarkApi", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    let returnedPlacemarks = await playtimeService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await playtimeService.deletePlacemark(returnedPlacemarks[i]._id);
    }
    returnedPlacemarks = await playtimeService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("denormalised list", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlacemark(beethovenSonatas._id, testPlacemarks[i]);
    }
    const returnedList = await playtimeService.getList(beethovenSonatas._id);
    assert.equal(returnedList.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedList.placemarks[i]);
    }
  });
});