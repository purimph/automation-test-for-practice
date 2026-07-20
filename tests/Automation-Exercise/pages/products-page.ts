import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly cartModal: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartModal = page.locator("#cartModal");
    this.viewCartLink = page.getByRole("link", { name: "View Cart" });
    this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
  }

  async goto() {
    await this.page.goto("/products");
  }

  async expectLoaded() {
    await expect(this.page.getByRole("heading", { name: "All Products" })).toBeVisible();
  }

  async addProductToCart(productId: string) {
    await this.page.locator(`.productinfo [data-product-id="${productId}"]`).click();
    await this.expectProductAddedModalVisible();
  }

  async expectProductAddedModalVisible() {
    await expect(this.cartModal).toBeVisible();
    await expect(this.page.getByText("Your product has been added to cart.")).toBeVisible();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.cartModal).toBeHidden();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }
}

