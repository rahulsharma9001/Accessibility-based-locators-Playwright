const AxeBuilder = require('@axe-core/playwright').default;
const { test, expect } = require('../fixtures/test-base');

test.describe('Accessibility contracts and resilience checks', () => {
  test('@regression validates the page with axe-core', async ({ demoPage, page }) => {
    await expect(demoPage.pageHeading).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('[data-pw="signup-form"]')
      .include('[aria-label="Products"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('@regression confirms fallback data-pw contracts exist', async ({ page, demoPage }) => {
    await expect(demoPage.pageHeading).toBeVisible();
    await expect(page.getByTestId('join-waitlist-button')).toBeVisible();
    await expect(page.getByTestId('reset-form-button')).toBeVisible();
    await expect(page.getByTestId('cart-status')).toHaveText('Cart is empty');
  });
});
