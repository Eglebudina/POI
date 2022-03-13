import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPois, poiShow } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Poi Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.poiStore.deleteAllPois();
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPois[i] = await db.poiStore.addPoi(testPois[i]);
    }
  });

  test("create a poi", async () => {
    const poi = await db.poiStore.addPoi(poiShow);
    assertSubset(poiShow, poi);
    assert.isDefined(poi._id);
  });

  test("delete all pois", async () => {
    let returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 3);
    await db.poiStore.deleteAllPois();
    returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 0);
  });

  test("get a poi - success", async () => {
    const poi = await db.poiStore.addPoi(poiShow);
    const returnedPoi = await db.poiStore.getPoiById(poi._id);
    assertSubset(poiShow, poi);
  });

  test("delete One Playist - success", async () => {
    const id = testPois[0]._id;
    await db.poiStore.deletePoiById(id);
    const returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, testPois.length - 1);
    const deletedPoi = await db.poiStore.getPoiById(id);
    assert.isNull(deletedPoi);
  });

  test("get a poi - bad params", async () => {
    assert.isNull(await db.poiStore.getPoiById(""));
    assert.isNull(await db.poiStore.getPoiById());
  });

  test("delete One Poi - fail", async () => {
    await db.poiStore.deletePoiById("bad-id");
    const allPois = await db.poiStore.getAllPois();
    assert.equal(testPois.length, allPois.length);
  });
});
