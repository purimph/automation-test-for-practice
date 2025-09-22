import { test, expect } from "@playwright/test";
import { users } from "../config/login-test.json";

test.describe("Test Login Page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });
  test("should login successfully with username and password ", async ({
    page,
  }) => {
    await page.fill("#user-name", users.standard_user.username);
    await page.fill("#password", users.standard_user.password);
    await page.click("#login-button");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("should show error with locked username and password", async ({
    page,
  }) => {
    await page.fill("#user-name", users.locked_out_user.username);
    await page.fill("#password", users.locked_out_user.password);
    await page.click("#login-button");
    await expect(page.locator("[data-test='error']")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
  test("should login successfully with problem username and password ", async ({
    page,
  }) => {
    await page.fill("#user-name", users.problem_user.username);
    await page.fill("#password", users.problem_user.password);
    await page.click("#login-button");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toHaveText("Products");
  });
});
