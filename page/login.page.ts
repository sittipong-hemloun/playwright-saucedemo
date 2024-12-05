import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMessage: Locator;
  readonly appLogo: Locator;
  readonly svgError: Locator;
  readonly errorMessageContainer: Locator;
  readonly url: string = "https://www.saucedemo.com/";

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginBtn = page.locator("#login-button");
    this.errorMessage = page.locator("[data-test=error]");
    this.appLogo = page.locator("div.app_logo");
    this.svgError = page.locator("svg[aria-hidden=true]");
    this.errorMessageContainer = page.locator(".error-message-container");
  }

  async login(username: string | null, password: string | null) {
    if (username) {
      await this.usernameInput.fill(username);
    } else {
      await this.usernameInput.clear(); // Ensures input is empty for null case
    }

    if (password) {
      await this.passwordInput.fill(password);
    } else {
      await this.passwordInput.clear(); // Ensures input is empty for null case
    }

    await this.loginBtn.click();
  }

  async validateError(message: string, count: number = 3, color: string = "rgb(226, 35, 26)") {
    await expect(this.errorMessage).toContainText(message);
    await expect(this.svgError).toHaveCount(count);
    await expect(this.errorMessageContainer).toHaveCSS("background-color", color);
  }

  async checkAppLogo() {
    await expect(this.appLogo).toBeVisible();
    await expect.soft(this.appLogo).toContainText("Swag Labs");
  }

  async checkURL(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
