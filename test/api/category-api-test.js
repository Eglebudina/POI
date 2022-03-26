import { assert } from "chai";
import { categoryService } from "./category-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, show, testCategorys } from "../fixtures.js";

suite("Category API tests", () => {

  let user = null;

  setup(async () => {
    categoryService.clearAuth();
    user = await categoryService.createUser(maggie);
    await categoryService.authenticate(maggieCredentials);
    await categoryService.deleteAllCategorys();
    await categoryService.deleteAllUsers();
    user = await categoryService.createUser(maggie);
    await categoryService.authenticate(maggieCredentials);
    show.userid = user._id;
  });

  teardown(async () => {});

  test("create category", async () => {
    const returnedCategory = await categoryService.createCategory(show);
    assert.isNotNull(returnedCategory);
    assertSubset(show, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await categoryService.createCategory(show);
    const response = await categoryService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await categoryService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categorys", async () => {
    for (let i = 0; i < testCategorys.length; i += 1) {
      testCategorys[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await categoryService.createCategory(testCategorys[i]);
    }
    let returnedLists = await categoryService.getAllCategorys();
    assert.equal(returnedLists.length, testCategorys.length);
    await categoryService.deleteAllCategorys();
    returnedLists = await categoryService.getAllCategorys();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await categoryService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});
