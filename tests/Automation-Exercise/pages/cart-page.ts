import { expect, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/view_cart$/);
  }

  async expectCartItem(
    productId: string,
    productName: string,
    price: string,
    quantity: string,
    total: string,
  ) {
    const cartRow = this.page.locator(`#product-${productId}`);

    await expect(cartRow.locator(".cart_description")).toContainText(productName);
    await expect(cartRow.locator(".cart_price")).toContainText(price);
    await expect(cartRow.locator(".cart_quantity")).toContainText(quantity);
    await expect(cartRow.locator(".cart_total")).toContainText(total);
  }
}

