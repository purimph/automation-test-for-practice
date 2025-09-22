import { test, expect } from "@playwright/test";
import { users } from "../../config/login-test.json";
import { LoginPage } from "../pages/login-page";
import { url } from "../../config/url-test.json";
import { InventoryPage } from "../pages/inventory-page";
import { CheckoutPage } from "../pages/checkout-page";

const testData = {
  firstName: "John",
  lastName: "Doe",
  postalCode: "12345",
  productName: "Sauce Labs Backpack",
  productPrice: "$29.99",
}
test.describe("Test Login Page", async () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;
  test.beforeEach(async ({ page }) => {
    await page.goto(url["login-url"]);
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
  });
  test.only("should login successfully with username and password ", async ({
    page,
  }) => {
    await loginPage.login(
      users.standard_user.username,
      users.standard_user.password
    );
    await expect(page).toHaveURL(url["inventory-url"]);
    await expect(page.locator(".title")).toHaveText("Products");
    await test.step("Add product to cart", async () => {
      await page.locator('[data-test="item-4-title-link"]').click();
      await inventoryPage.addToCart();
      await inventoryPage.verifyProductDetails(testData.productName, testData.productPrice);
      await inventoryPage.goToCart();
    });
    await test.step("Checkout", async () => {
      await checkoutPage.verifyProductDetails(testData.productName, testData.productPrice);
      await checkoutPage.clickCheckout();
      await checkoutPage.keyInFirstName(testData.firstName);
      await checkoutPage.keyInLastName(testData.lastName);
      await checkoutPage.keyInPostalCode(testData.postalCode);
      await checkoutPage.continueCheckout();
      await checkoutPage.finishCheckout();
    });
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
    await expect(page).toHaveURL(url["inventory-url"]);
    await expect(page.locator(".title")).toHaveText("Products");
  });
});
