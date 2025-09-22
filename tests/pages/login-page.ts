import { Locator, Page } from "playwright/test";

const { expect } = require('@playwright/test');

export class LoginPage {
    readonly page: Page
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly clickLoginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.clickLoginButton = page.locator('#login-button');
    }
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.clickLoginButton.click();
    }
}