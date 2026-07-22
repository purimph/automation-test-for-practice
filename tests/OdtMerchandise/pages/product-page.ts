import { expect, Locator, Page } from "@playwright/test";
export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly shopTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator(".product-title");
    this.productDescription = page.locator(".product-description");
    this.addToCartButton = page.locator(".add-to-cart-button");
    this.shopTitle = page.locator(".shop-title");
  }

  async gotoProductPage(productId: string) {
    await this.page.goto(`/product/${productId}`);
    await expect(this.productTitle).toBeVisible();
  }
}