import { assert } from "chai";
import { poiService } from "./category-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, poiShow, testPois } from "../fixtures.js";

suite("Category API tests", () => {

  let user = null;

  setup(async () => {
    poiService.clearAuth();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggieCredentials);
    await poiService.deleteAllPois();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggieCredentials);
    poiShow.userid = user._id;
  });

  teardown(async () => {});

  test("create category", async () => {
    const returnedPoi = await poiService.createPoi(poiShow);
    assert.isNotNull(returnedPoi);
    assertSubset(poiShow, returnedPoi);
  });

  test("delete a category", async () => {
    const category = await poiService.createPoi(poiShow);
    const response = await poiService.deletePoi(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedPoi = await poiService.getpoi(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple places", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      testPois[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoi(testPois[i]);
    }
    let returnedLists = await poiService.getAllPois();
    assert.equal(returnedLists.length, testPois.length);
    await poiService.deleteAllPois();
    returnedLists = await poiService.getAllPois();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await poiService.deletePoi("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});