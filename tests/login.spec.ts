import { test } from "@playwright/test";
import { LoginPage } from "../page/login.page";
import userData from "../data/user.json";

test.describe("Login Suite", () => {
  let pageLogin: LoginPage;

  test.beforeEach("Open Base URL", async ({ page }) => {
    pageLogin = new LoginPage(page);
    await page.goto(pageLogin.url);
  });

  // Successful login tests from JSON data
  userData.userAccount.forEach((user) => {
    test(`Login Success - ${user.username}`, async ({ page }) => {
      await pageLogin.login(user.username, user.password);
      await pageLogin.checkAppLogo();
      await pageLogin.checkURL("https://www.saucedemo.com/inventory.html");
    });
  });

  // Negative test cases for invalid login attempts
  const negativeTests = [
    {
      description: "Login Fail with blank username & password",
      username: null,
      password: null,
      errorMessage: "Epic sadface: Username is required",
    },
    {
      description: "Login Fail with blank username",
      username: null,
      password: "secret_sauce",
      errorMessage: "Epic sadface: Username is required",
    },
    {
      description: "Login Fail with blank password",
      username: "standard_user",
      password: null,
      errorMessage: "Epic sadface: Password is required",
    },
    {
      description: "Login Fail with invalid username & password",
      username: "mai-ru",
      password: "mai-shi",
      errorMessage:
        "Epic sadface: Username and password do not match any user in this service",
    },
  ];

  negativeTests.forEach(({ description, username, password, errorMessage }) => {
    test(description, async ({ page }) => {
      await pageLogin.login(username, password);
      await pageLogin.validateError(errorMessage);
      await pageLogin.checkURL(pageLogin.url);
    });
  });
});
