import { test } from "@playwright/test";
import { CartPage } from "../pages/cart-page";
import { ProductDetailsPage } from "../pages/product-details-page";
import { ProductsPage } from "../pages/products-page";

test.describe("Add to cart flow", () => {
  test("AE-ADD-TO-CART-001: user can add a product to the cart from all products page", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goto();
    await productsPage.expectLoaded();
    await productsPage.addProductToCart("1");
    await productsPage.viewCart();
    await cartPage.expectLoaded();
    await cartPage.expectCartItem("1", "Blue Top", "Rs. 500", "1", "Rs. 500");
  });

  test("AE-ADD-TO-CART-002: user can add multiple products to the cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goto();
    await productsPage.expectLoaded();
    await productsPage.addProductToCart("1");
    await productsPage.continueShopping();
    await productsPage.addProductToCart("2");
    await productsPage.viewCart();
    await cartPage.expectLoaded();
    await cartPage.expectCartItem("1", "Blue Top", "Rs. 500", "1", "Rs. 500");
    await cartPage.expectCartItem("2", "Men Tshirt", "Rs. 400", "1", "Rs. 400");
  });

  test("AE-ADD-TO-CART-003: user can add a product with quantity from product details page", async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await productDetailsPage.goto("1");
    await productDetailsPage.expectProductNameVisible("Blue Top");
    await productDetailsPage.addToCartWithQuantity("4");
    await productDetailsPage.viewCart();
    await cartPage.expectLoaded();
    await cartPage.expectCartItem("1", "Blue Top", "Rs. 500", "4", "Rs. 2000");
  });
});
