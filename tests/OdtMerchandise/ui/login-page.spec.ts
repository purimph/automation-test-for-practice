import { test, expect } from "@playwright/test";

test.describe("login page should be visible", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://merchandise-dev.odds.team/index.html");
  });

  test("User can login successfully", async ({ page }) => {
    await test.step("Login page should be visible", async () => {
      await expect(page.getByText("ODT x merchandise")).toBeVisible();
      await expect(page.getByTestId("login-field")).toBeVisible();
      await expect(page.getByTestId("password-field")).toBeVisible();
      await expect(page.getByTestId("submit-button")).toBeVisible();
    });

    await test.step("User can login successfully", async () => {
      await page.getByTestId("login-field").fill("customer1");
      await page.getByTestId("password-field").fill("password");
      await page.getByTestId("submit-button").click();
      await expect(page.getByTestId("shop-title")).toHaveText(
        "ODT x merchandise",
      );
    });

    await test.step("Product list should be visible after login", async () => {
      await expect(page.getByTestId("cart")).toBeVisible();
      await expect(page.getByTestId("store-container")).toBeVisible();
    });
  });
});
