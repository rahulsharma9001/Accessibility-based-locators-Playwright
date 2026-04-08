class ProductCatalog {
  constructor(page) {
    this.page = page;
    this.root = page.getByRole('list', { name: 'Products' });
    this.status = page.locator('#cart-status');
  }

  card(productName) {
    return this.page
      .getByRole('listitem')
      .filter({ has: this.page.getByRole('heading', { name: productName }) });
  }

  async addToCart(productName) {
    await this.card(productName).getByRole('button', { name: 'Add to cart' }).click();
  }
}

module.exports = { ProductCatalog };
