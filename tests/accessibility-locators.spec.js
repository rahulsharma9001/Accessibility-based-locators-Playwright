const { test, expect } = require('../fixtures/test-base');
const { signupUsers } = require('../test-data/signup-users');

test.describe('Accessibility-first locator framework POC', () => {
  test('@smoke submits the signup form using roles and labels', async ({ demoPage }) => {
    await expect(demoPage.pageHeading).toBeVisible();

    await demoPage.fillSignupForm(signupUsers.proUser);

    await expect(demoPage.signupForm.joinWaitlistButton).toBeEnabled();
    await demoPage.submitSignupForm();

    await expect(demoPage.signupForm.status).toContainText(
      `${signupUsers.proUser.fullName} joined the ${signupUsers.proUser.plan} plan waitlist`
    );
  });

  test('@smoke selects a repeated product card through scoped locators', async ({ demoPage }) => {
    await demoPage.addProductToCart('Locator Guardrails Kit');

    await expect(demoPage.productCatalog.status).toHaveText('Locator Guardrails Kit added to cart.');
  });

  test('@regression resets the form and disables submission again', async ({ demoPage }) => {
    await demoPage.fillSignupForm(signupUsers.starterUser);
    await demoPage.resetSignupForm();

    await expect(demoPage.signupForm.joinWaitlistButton).toBeDisabled();
    await expect(demoPage.signupForm.status).toHaveText('Waiting for input');
  });
});
