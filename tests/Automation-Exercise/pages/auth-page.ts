import { expect, Locator, Page } from "@playwright/test";
import { RegisterUser } from "../fixtures/users";

export class AuthPage {
  readonly page: Page;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly createAccountButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async gotoLoginPage() {
    await this.page.goto("/login");
  }

  async expectLoginAndSignupFormsVisible() {
    await expect(this.page.getByRole("heading", { name: "Login to your account" })).toBeVisible();
    await expect(this.page.getByRole("heading", { name: "New User Signup!" })).toBeVisible();
    await expect(this.loginEmailInput).toBeVisible();
    await expect(this.loginPasswordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.signupNameInput).toBeVisible();
    await expect(this.signupEmailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }

  async startSignup(user: RegisterUser) {
    await this.signupNameInput.fill(user.name);
    await this.signupEmailInput.fill(user.email);
    await this.signupButton.click();
  }

  async expectAccountInformationVisible(user: RegisterUser) {
    await expect(this.page.getByText("Enter Account Information")).toBeVisible();
    await expect(this.page.locator('[data-qa="name"]')).toHaveValue(user.name);
    await expect(this.page.locator('[data-qa="email"]')).toHaveValue(user.email);
  }

  async fillAccountInformation(user: RegisterUser) {
    await this.page.locator("#id_gender1").check();
    await this.page.locator('[data-qa="password"]').fill(user.password);
    await this.page.locator('[data-qa="days"]').selectOption(user.birthDay);
    await this.page.locator('[data-qa="months"]').selectOption(user.birthMonth);
    await this.page.locator('[data-qa="years"]').selectOption(user.birthYear);
    await this.page.locator("#newsletter").check();
    await this.page.locator("#optin").check();
    await this.page.locator('[data-qa="first_name"]').fill(user.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(user.lastName);
    await this.page.locator('[data-qa="company"]').fill(user.company);
    await this.page.locator('[data-qa="address"]').fill(user.address);
    await this.page.locator('[data-qa="address2"]').fill(user.address2);
    await this.page.locator('[data-qa="country"]').selectOption(user.country);
    await this.page.locator('[data-qa="state"]').fill(user.state);
    await this.page.locator('[data-qa="city"]').fill(user.city);
    await this.page.locator('[data-qa="zipcode"]').fill(user.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(user.mobileNumber);
  }

  async createAccount(user: RegisterUser) {
    await this.startSignup(user);
    await this.expectAccountInformationVisible(user);
    await this.fillAccountInformation(user);
    await this.createAccountButton.click();
    await expect(this.page.locator('[data-qa="account-created"]')).toContainText("Account Created!");
    await this.continueButton.click();
    await this.expectLoggedInAs(user.name);
  }

  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedInAs(name: string) {
    await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible();
  }

  async logout() {
    await this.page.getByRole("link", { name: /Logout/ }).click();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async deleteAccount() {
    await this.page.getByRole("link", { name: /Delete Account/ }).click();
    await expect(this.page.locator('[data-qa="account-deleted"]')).toContainText("Account Deleted!");
    await this.continueButton.click();
  }
}

