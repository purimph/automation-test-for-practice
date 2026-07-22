import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test.describe("login page should be visible", async () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
  });

  test("User can login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Login page should be visible", async () => {
      await expect(loginPage.headerTitle).toBeVisible();
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });

    await test.step("User can login successfully", async () => {
      await loginPage.login("customer1", "password");
    });

    await test.step("Product list should be visible after login", async () => {
      await expect(page.getByTestId("cart")).toBeVisible();
      await expect(page.getByTestId("store-container")).toBeVisible();
    });
  });
});
