import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
  readonly page: Page;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly cartModal: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityInput = page.locator("#quantity");
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.cartModal = page.locator("#cartModal");
    this.viewCartLink = page.getByRole("link", { name: "View Cart" });
  }

  async goto(productId: string) {
    await this.page.goto(`/product_details/${productId}`);
  }

  async expectProductNameVisible(productName: string) {
    await expect(this.page.getByRole("heading", { name: productName })).toBeVisible();
  }

  async addToCartWithQuantity(quantity: string) {
    await this.quantityInput.fill(quantity);
    await this.addToCartButton.click();
    await this.expectProductAddedModalVisible();
  }

  async expectProductAddedModalVisible() {
    await expect(this.cartModal).toBeVisible();
    await expect(this.page.getByText("Your product has been added to cart.")).toBeVisible();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }
}

