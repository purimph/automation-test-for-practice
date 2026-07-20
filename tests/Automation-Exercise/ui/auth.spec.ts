import { expect, test } from "@playwright/test";
import { createRegisterUser } from "../fixtures/users";
import { AuthPage } from "../pages/auth-page";

test.describe("Automation Exercise login flow", () => {
  test("AE-LOGIN-001: login and signup forms are displayed", async ({ page }) => {
    const authPage = new AuthPage(page);

    await authPage.gotoLoginPage();
    await authPage.expectLoginAndSignupFormsVisible();
  });

  test("AE-LOGIN-002: user can login with a valid account", async ({ page }) => {
    const authPage = new AuthPage(page);
    const user = createRegisterUser();

    await authPage.gotoLoginPage();
    await authPage.createAccount(user);
    await authPage.logout();

    await authPage.login(user.email, user.password);
    await authPage.expectLoggedInAs(user.name);
    await authPage.deleteAccount();
  });

  test("AE-LOGIN-003: user sees an error with invalid credentials", async ({ page }) => {
    const authPage = new AuthPage(page);

    await authPage.gotoLoginPage();
    await authPage.login("invalid-user@example.com", "wrong-password");

    await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
  });
});

test.describe("Automation Exercise register flow", () => {
  test("AE-REGISTER-001: signup opens account information form", async ({ page }) => {
    const authPage = new AuthPage(page);
    const user = createRegisterUser();

    await authPage.gotoLoginPage();
    await authPage.startSignup(user);

    await authPage.expectAccountInformationVisible(user);
  });

  test("AE-REGISTER-002: user can register successfully", async ({ page }) => {
    const authPage = new AuthPage(page);
    const user = createRegisterUser();

    await authPage.gotoLoginPage();
    await authPage.createAccount(user);
    await authPage.deleteAccount();
  });

  test("AE-REGISTER-003: user cannot register with an existing email", async ({ page }) => {
    const authPage = new AuthPage(page);
    const user = createRegisterUser();

    await authPage.gotoLoginPage();
    await authPage.createAccount(user);
    await authPage.logout();
    await authPage.startSignup(user);

    await expect(page.getByText("Email Address already exist!")).toBeVisible();
    await authPage.login(user.email, user.password);
    await authPage.deleteAccount();
  });
});

