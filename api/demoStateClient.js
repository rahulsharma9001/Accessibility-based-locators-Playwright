class DemoStateClient {
  constructor(request) {
    this.request = request;
  }

  async resetState() {
    const response = await this.request.post('/api/state/reset');
    if (!response.ok()) {
      throw new Error(`Failed to reset demo state: ${response.status()}`);
    }

    return response.json();
  }

  async getState() {
    const response = await this.request.get('/api/state');
    if (!response.ok()) {
      throw new Error(`Failed to read demo state: ${response.status()}`);
    }

    return response.json();
  }
}

module.exports = { DemoStateClient };
