const form = document.getElementById('signup-form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const termsCheckbox = document.getElementById('terms');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const formStatus = document.getElementById('form-status');
const cartStatus = document.getElementById('cart-status');
const productButtons = document.querySelectorAll('.product-card button');

async function syncState() {
  const response = await fetch('/api/state');
  const state = await response.json();
  formStatus.textContent = state.formStatus;
  cartStatus.textContent = state.cartStatus;
}

function getSelectedPlan() {
  const checkedPlan = document.querySelector('input[name="plan"]:checked');
  return checkedPlan ? checkedPlan.value : '';
}

function updateSubmitState() {
  const canSubmit =
    fullNameInput.value.trim() &&
    emailInput.value.trim() &&
    getSelectedPlan() &&
    termsCheckbox.checked;

  submitButton.disabled = !canSubmit;
}

async function resetForm() {
  form.reset();
  const response = await fetch('/api/state/reset', { method: 'POST' });
  const state = await response.json();
  formStatus.textContent = state.formStatus;
  cartStatus.textContent = state.cartStatus;
  updateSubmitState();
}

fullNameInput.addEventListener('input', updateSubmitState);
emailInput.addEventListener('input', updateSubmitState);
termsCheckbox.addEventListener('change', updateSubmitState);
document.querySelectorAll('input[name="plan"]').forEach((radio) => {
  radio.addEventListener('change', updateSubmitState);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const plan = getSelectedPlan();
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullName: fullNameInput.value,
      email: emailInput.value,
      plan
    })
  });
  const state = await response.json();
  formStatus.textContent = state.formStatus;
});

resetButton.addEventListener('click', resetForm);

productButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const productName = button
      .closest('article')
      .getAttribute('data-product-name');

    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productName })
    });
    const state = await response.json();
    cartStatus.textContent = state.cartStatus;
  });
});

syncState();
