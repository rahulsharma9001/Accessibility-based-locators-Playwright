const { SignupForm } = require('../components/signupForm');
const { ProductCatalog } = require('../components/productCatalog');

class AccessibilityDemoPage {
  constructor(page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: 'Accessibility-first locator demo' });
    this.signupForm = new SignupForm(page);
    this.productCatalog = new ProductCatalog(page);
  }

  async open() {
    await this.page.goto('/');
  }

  async fillSignupForm({ fullName, email, plan, acceptTerms = true }) {
    await this.signupForm.fill({ fullName, email, plan, acceptTerms });
  }

  async submitSignupForm() {
    await this.signupForm.submit();
  }

  async resetSignupForm() {
    await this.signupForm.reset();
  }

  async addProductToCart(productName) {
    await this.productCatalog.addToCart(productName);
  }
}

module.exports = { AccessibilityDemoPage };
