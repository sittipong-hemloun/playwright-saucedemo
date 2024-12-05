# Writing Test

## 1. **Imports**

```tsx
import { test } from "@playwright/test";
import { LoginPage } from "../page/login.page";
```

- `test`: Imported from Playwright to define test cases and use its fixtures for managing browser and page contexts.
- `LoginPage`: A custom Page Object Model (POM) class to encapsulate login page interactions (e.g., entering username/password, clicking login, and checking elements).

---

## 2. **Test Suite Declaration**

```tsx
test.describe("Login Suite", () => {
```

- **`test.describe()`** groups related test cases together into a "test suite" called `"Login Suite"`.

---

## 3. **`beforeEach` Hook: Setup Before Each Test**

```tsx
test.beforeEach("Open Base URL", async ({ page }) => {
  pageLogin = new LoginPage(page);
  await page.goto(pageLogin.url);
});
```

- **`test.beforeEach()`** runs before each test case in the suite.
- Initializes the `LoginPage` object and navigates to the **base URL** (likely the login page).
- `page.goto(pageLogin.url)` navigates the browser to the URL defined in the `LoginPage` class.

---

## 4. **Positive Test Cases (Successful Login)**

```tsx
test(`Login Success - ${user.username}`, async ({ page }) => {
  await pageLogin.login(user.username, user.password);
  await pageLogin.checkURL("https://www.saucedemo.com/inventory.html");
});
```

- **`test()`**: Defines a test case for each user.
- **`pageLogin.login(user.username, user.password)`**: Calls the `login()` method from the `LoginPage` class to log in.
- **`pageLogin.checkURL("https://www.saucedemo.com/inventory.html")`**: Verifies that the user is redirected to the correct URL after a successful login.