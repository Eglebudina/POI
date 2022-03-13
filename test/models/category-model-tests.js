import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPois, testCategory, cat1, cat2, categoryShow, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Category Model tests", () => {

  let categoryShowList = null;

  setup(async () => {
    db.init("mongo");
    await db.poiStore.deleteAllPois();
    await db.categoryStore.deleteAllCategorys();
    categoryShowList = await db.poiStore.addPoi(categoryShow);
    for (let i = 0; i < testCategory.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCategory[i] = await db.categoryStore.addCategory(categoryShowList._id, testCategory[i]);
    }
  });

  test("create single category", async () => {
    const cat1List = await db.poiStore.addPoi(cat1);
    const category = await db.categoryStore.addCategory(cat1List._id, cat2)
    assert.isNotNull(category._id);
    assertSubset (cat2, category);
  });

  test("get multiple categorys", async () => {
    const categorys = await db.categoryStore.getCategorysByPoiId(categoryShowList._id);
    assert.equal(testCategory.length, testCategory.length)
  });

  test("delete all categorys", async () => {
    const categorys = await db.categoryStore.getCategorys();
    assert.equal(testCategory.length, categorys.length);
    await db.categoryStore.deleteAllCategorys();
    const newCategorys = await db.categoryStore.getCategorys();
    assert.equal(0, newCategorys.length);
  });

  test("get a category - success", async () => {
    const cat1List = await db.poiStore.addPoi(cat1);
    const category = await db.categoryStore.addCategory(cat1List._id, cat2)
    const newCategory = await db.categoryStore.getCategoryById(category._id);
    assertSubset (cat2, newCategory);
  });

  test("delete One Category - success", async () => {
    await db.categoryStore.deleteCategory(testCategory[0]._id);
    const categorys = await db.categoryStore.getCategorys();
    assert.equal(categorys.length, testPois.length - 1);
    const deletedCategory = await db.categoryStore.getCategoryById(testCategory[0]._id);
    assert.isNull(deletedCategory);
  });

  test("get a category - bad params", async () => {
    assert.isNull(await db.categoryStore.getCategoryById(""));
    assert.isNull(await db.categoryStore.getCategoryById());
  });

  test("delete one category - fail", async () => {
    await db.categoryStore.deleteCategory("bad-id");
    const categorys = await db.categoryStore.getCategorys();
    assert.equal(categorys.length, testPois.length);
  });
});