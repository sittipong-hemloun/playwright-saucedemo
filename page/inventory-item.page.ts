import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly shoppingCartBadge: Locator;
  readonly primaryButton: Locator;
  readonly secondaryButton: Locator;
  readonly sortSelect: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = page.locator("[data-test=shopping-cart-badge]");
    this.primaryButton = page.locator(".btn.btn_primary.btn_small.btn_inventory");
    this.secondaryButton = page.locator(".btn.btn_secondary.btn_small.btn_inventory");
    this.sortSelect = page.locator("[data-test=active-option]");
    this.inventoryItems = page.locator(".inventory_item");
    this.inventoryItemName = page.locator(".inventory_item_name");
    this.inventoryItemPrice = page.locator(".inventory_item_price");
  }

  // Check if the page URL is correct
  async checkURL(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
    await expect(this.page.locator("div.app_logo")).toHaveText("Swag Labs");
  }

  // Add all items to the cart
  async addAllItemsToCart() {
    const itemCount = await this.inventoryItems.count();
    for (let i = 0; i < itemCount; i++) {
      await this.primaryButton.nth(i).click();
      await expect(this.shoppingCartBadge).toHaveText((i + 1).toString());
    }
  }

  // Remove all items from the cart
  async removeAllItemsFromCart() {
    const itemCount = await this.inventoryItems.count();
    for (let i = 0; i < itemCount; i++) {
      await this.secondaryButton.nth(0).click(); // Always remove the first available item
    }
    await expect(this.shoppingCartBadge).not.toBeVisible();
  }

  // Check the visibility of the shopping cart badge
  async checkShoppingCartBadge(visible: boolean) {
    if (visible) {
      await expect(this.shoppingCartBadge).toBeVisible();
    } else {
      await expect(this.shoppingCartBadge).not.toBeVisible();
    }
  }

  // Sort items based on the selected option and validate
  async sortItems(option: string) {
    await this.page.locator("[data-test=product-sort-container]").selectOption({ label: option });
    await expect(this.sortSelect).toHaveText(option);

    switch (option) {
      case "Name (A to Z)":
        await this.checkSortedItems((a, b) => a.localeCompare(b), this.inventoryItemName);
        break;
      case "Name (Z to A)":
        await this.checkSortedItems((a, b) => b.localeCompare(a), this.inventoryItemName);
        break;
      case "Price (low to high)":
        await this.checkSortedItems((a, b) => a - b, this.inventoryItemPrice, true);
        break;
      case "Price (high to low)":
        await this.checkSortedItems((a, b) => b - a, this.inventoryItemPrice, true);
        break;
    }
  }

  // Check if items are sorted correctly
  async checkSortedItems(
    comparator: (a: any, b: any) => number,
    locator: Locator,
    isNumeric: boolean = false
  ) {
    const itemCount = await this.inventoryItems.count();
    const values: (string | number)[] = [];

    for (let i = 0; i < itemCount; i++) {
      const text = await locator.nth(i).innerText();
      values.push(isNumeric ? parseFloat(text.replace("$", "")) : text);
    }

    const sortedValues = [...values].sort(comparator);
    await expect(values).toEqual(sortedValues);
  }
}
