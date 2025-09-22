import { expect, Page , Locator } from "@playwright/test";

export class InventoryPage {
    readonly page: Page
    readonly productName : Locator;
    readonly productPrice : Locator;
    readonly addToCartButton : Locator;
    readonly cartButton : Locator;
    constructor(page: Page){
        this.page = page;
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    }
    async verifyProductDetails(name: string, price: string) {
        await expect(this.productName).toHaveText(name);
        await expect(this.productPrice).toHaveText(price);
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async goToCart() {
        await this.cartButton.click();
    }
}