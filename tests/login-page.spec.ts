import { test, expect } from "@playwright/test";
import { users } from "../config/login-test.json";
import { LoginPage } from "../tests/pages/login-page";
import { log } from "console";
const urlTest = require("../config/url-test.json");

test.describe("Test Login Page", async () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto(urlTest["login-url"]);
    loginPage = new LoginPage(page);
  });
  test("should login successfully with username and password ", async ({
    page,
  }) => {
    await loginPage.login(
      users.standard_user.username,
      users.standard_user.password
    );
    await expect(page).toHaveURL(urlTest["inventory-url"]);
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("should show error with locked username and password", async ({
    page,
  }) => {
    await loginPage.login(
      users.locked_out_user.username,
      users.locked_out_user.password
    );
    await expect(page.locator("[data-test='error']")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
  test("should login successfully with problem username and password ", async ({
    page,
  }) => {
    await loginPage.login(
      users.problem_user.username,
      users.problem_user.password
    );
    await expect(page).toHaveURL(urlTest["inventory-url"]);
    await expect(page.locator(".title")).toHaveText("Products");
  });
});
