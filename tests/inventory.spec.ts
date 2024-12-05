import { test } from "@playwright/test";
import { LoginPage } from "../page/login.page";
import { InventoryPage } from "../page/inventory-item.page";

test.describe("Inventory Suite", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach("Login and navigate to inventory", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user", "secret_sauce");
    inventoryPage = new InventoryPage(page);
  });

  test("Check Inventory URL", async () => {
    await inventoryPage.checkURL("https://www.saucedemo.com/inventory.html");
  });

  test("Add and remove all items from cart", async () => {
    await inventoryPage.addAllItemsToCart();
    await inventoryPage.removeAllItemsFromCart();
  });

  test("Sorting Items by Different Filters", async () => {
    await inventoryPage.sortItems("Name (A to Z)");
    await inventoryPage.sortItems("Name (Z to A)");
    await inventoryPage.sortItems("Price (low to high)");
    await inventoryPage.sortItems("Price (high to low)");
  });
});
