import { expect, Page, Locator } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly checkoutButton: Locator;
    readonly fieldFirstName: Locator;
    readonly fieldLastName: Locator;
    readonly fieldPostalCode: Locator;
    readonly continueCheckoutButton: Locator;
    readonly finishButton: Locator;
    readonly completeCheckoutText: Locator;
    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test="item-4-title-link"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.fieldFirstName = page.locator('[data-test="firstName"]');
        this.fieldLastName = page.locator('[data-test="lastName"]');
        this.fieldPostalCode = page.locator('[data-test="postalCode"]');
        this.continueCheckoutButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeCheckoutText = page.locator('[data-test="complete-header"]');
    }

    async verifyProductDetails(name: string, price: string) {
        await expect(this.productName).toHaveText(name);
        await expect(this.productPrice).toHaveText(price);
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async keyInFirstName(firstName: string) {
        await this.fieldFirstName.fill(firstName);
    }

    async keyInLastName(lastName: string) {
        await this.fieldLastName.fill(lastName);
    }

    async keyInPostalCode(postalCode: string) {
        await this.fieldPostalCode.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueCheckoutButton.click();
    }
    
    async finishCheckout() {
        await this.finishButton.click();
        await expect(this.completeCheckoutText).toHaveText("Thank you for your order!");
    }
}
