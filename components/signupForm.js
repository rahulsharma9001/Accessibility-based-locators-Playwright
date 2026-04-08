class SignupForm {
  constructor(page) {
    this.page = page;
    this.root = page.locator('[data-pw="signup-form"]');
    this.fullNameInput = page.getByLabel('Full name');
    this.emailInput = page.getByLabel('Email address');
    this.joinWaitlistButton = page.getByRole('button', { name: 'Join waitlist' });
    this.resetFormButton = page.getByRole('button', { name: 'Reset form' });
    this.status = page.locator('#form-status');
  }

  planRadio(planName) {
    return this.page.getByRole('radio', { name: planName });
  }

  termsCheckbox() {
    return this.page.getByRole('checkbox', {
      name: 'I agree to the automation demo terms'
    });
  }

  async fill({ fullName, email, plan, acceptTerms = true }) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.planRadio(plan).check();

    if (acceptTerms) {
      await this.termsCheckbox().check();
    }
  }

  async submit() {
    await this.joinWaitlistButton.click();
  }

  async reset() {
    await this.resetFormButton.click();
  }
}

module.exports = { SignupForm };
