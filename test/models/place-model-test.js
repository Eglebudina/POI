import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategorys, testPlaces, show2, show, placeShow, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {

  let show2List = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategorys();
    await db.placeStore.deleteAllPlaces();
    show2List = await db.categoryStore.addCategory(show2);
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await db.placeStore.addPlace(show2List._id, testPlaces[i]);
    }
  });

  test("create single place", async () => {
    const showList = await db.categoryStore.addCategory(show);
    const place = await db.placeStore.addPlace(showList._id, placeShow)
    assert.isNotNull(place._id);
    assertSubset (placeShow, place);
  });

  test("create multiple placeApi", async () => {
    const places = await db.categoryStore.getCategoryById(show2List._id);
    assert.equal(testPlaces.length, testPlaces.length)
  });

  test("delete all placeApi", async () => {
    const places = await db.placeStore.getAllPlaces();
    assert.equal(testPlaces.length, places.length);
    await db.placeStore.deleteAllPlaces();
    const newPlaces = await db.placeStore.getAllPlaces();
    assert.equal(0, newPlaces.length);
  });

  test("get a place - success", async () => {
    const showList = await db.categoryStore.addCategory(show);
    const place = await db.placeStore.addPlace(showList._id, placeShow)
    const newPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset (placeShow, newPlace);
  });

  test("delete One Place - success", async () => {
    const id = testPlaces[0]._id;
    await db.placeStore.deletePlace(id);
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testCategorys.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(id);
    assert.isNull(deletedPlace);
  });

  test("get a category - bad params", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("delete One User - fail", async () => {
    await db.placeStore.deletePlace("bad-id");
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testCategorys.length);
  });
});
