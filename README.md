# Playwright Accessibility Locator POC

This project is a small Node.js + Playwright proof of concept that demonstrates how to automate UI flows using accessibility-based locators instead of fragile DOM-driven selectors. It is structured like a lightweight starter framework and includes resilience patterns beyond selectors alone.

## What this POC shows

- `getByRole()` for buttons, headings, radio buttons, checkboxes, and list items
- `getByLabel()` for form fields
- scoped locators with `.filter({ has: ... })` for repeated cards/components
- `role="status"` and `aria-live` regions for stable assertions
- a local demo app, so the POC does not depend on external websites

## Framework structure

- `config/`: environment-driven runtime config
- `public/`: local demo UI used for the presentation
- `server.js`: lightweight Node HTTP server
- `api/`: API helpers used for state reset and setup
- `components/`: reusable UI fragments such as forms and catalogs
- `pages/`: page objects that model the app through accessible UI contracts
- `fixtures/`: shared Playwright fixtures and common setup
- `test-data/`: reusable test data kept separate from test logic
- `tests/`: spec files that stay focused on business flows
- `playwright.config.js`: Playwright configuration with a local web server

## Why this structure is better

- Tests stay readable because setup and selectors are centralized
- Locator maintenance happens in page objects instead of every spec
- Shared fixtures make it easier to scale into larger suites
- Test data can be reused across smoke, regression, and negative scenarios
- The framework still demonstrates the core principle: accessibility-first selection
- API-based reset keeps tests isolated and reduces UI setup flakiness
- `data-pw` offers a controlled fallback contract for cases where accessible names are not enough

## Resilience improvements included

- Accessibility-first locators as the default strategy
- `data-pw` fallback selectors configured through Playwright `testIdAttribute`
- API-assisted test reset through local endpoints
- reusable component objects for repeated widgets
- smoke and regression tagging with `--grep`
- axe-core accessibility scan for semantic regressions
- traces, screenshots, and videos for faster failure diagnosis

## Why this matters

Traditional CSS/XPath locators often break when:

- markup structure changes
- classes are renamed
- wrapper elements are added
- component libraries re-render DOM differently

Accessibility-based locators are usually more stable because they rely on the UI contract exposed to users and assistive technologies: role, label, accessible name, and visible semantics.

## Demo script for presentation

1. Open the app and show the form labels, radio buttons, and buttons.
2. Explain that the tests do not depend on `.class-name`, `div > span`, or XPath.
3. Show [pages/accessibilityDemoPage.js](/home/nashtech/Desktop/Node-based-Playwright/pages/accessibilityDemoPage.js) and point out that selectors are built with labels, roles, and accessible names.
4. Show [components/signupForm.js](/home/nashtech/Desktop/Node-based-Playwright/components/signupForm.js) and [components/productCatalog.js](/home/nashtech/Desktop/Node-based-Playwright/components/productCatalog.js) to explain reusable component objects.
5. Show the repeated product cards and explain scoped selection with a stable heading.
6. Open [tests/accessibility-locators.spec.js](/home/nashtech/Desktop/Node-based-Playwright/tests/accessibility-locators.spec.js) and point out that the test reads like a user interaction flow.
7. Open [tests/accessibility-contracts.spec.js](/home/nashtech/Desktop/Node-based-Playwright/tests/accessibility-contracts.spec.js) to show extra resilience checks beyond normal UI flows.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Install the Playwright browser:

```bash
npx playwright install chromium
```

3. Run the tests:

```bash
npm test
```

4. Run only smoke tests:

```bash
npm run test:smoke
```

5. Run the resilience and contract checks:

```bash
npm run test:contracts
```

6. Open the HTML report:

```bash
npm run show-report
```

7. Run the demo app only:

```bash
npm start
```

Then open `http://127.0.0.1:3000`.

## Talking points for your team

- We are not avoiding locators entirely; we are replacing brittle DOM locators with accessibility-first locators.
- The preferred order is: accessibility locators first, test IDs second, CSS/XPath only as a fallback.
- Good automation and good accessibility often reinforce each other.
- A maintainable framework separates page contracts, fixtures, and test data from the test scenarios.
- Test stability also depends on API setup, isolated state, diagnostics, and fallback contracts.
