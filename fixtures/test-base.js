const base = require('@playwright/test');
const { DemoStateClient } = require('../api/demoStateClient');
const { AccessibilityDemoPage } = require('../pages/accessibilityDemoPage');

const test = base.test.extend({
  demoStateClient: async ({ request }, use) => {
    await use(new DemoStateClient(request));
  },
  demoPage: async ({ page }, use) => {
    const demoPage = new AccessibilityDemoPage(page);
    await demoPage.open();
    await use(demoPage);
  }
});

test.beforeEach(async ({ demoStateClient }) => {
  await demoStateClient.resetState();
});

module.exports = {
  test,
  expect: base.expect
};
