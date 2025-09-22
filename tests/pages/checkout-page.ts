import { expect, Page } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async verifyProductDetails(name: string, price: string) {
        await expect(this.page.locator('[data-test="item-4-title-link"]')).toHaveText(name);
        await expect(this.page.locator('[data-test="inventory-item-price"]')).toHaveText(price);
    }

    async clickCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }

    async keyInFirstName(firstName: string) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
    }

    async keyInLastName(lastName: string) {
        await this.page.locator('[data-test="lastName"]').fill(lastName);
    }

    async keyInPostalCode(postalCode: string) {
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }

    async continueCheckout() {
        await this.page.locator('[data-test="continue"]').click();
    }
    
    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();
        await expect(this.page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!");
    }
}
