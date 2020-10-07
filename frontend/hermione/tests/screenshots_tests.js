describe('Screenshot tests', () => {
  it('Should test view of home page', function() {
    return this.browser
      .url('/')
      .assertView('home', 'html')
  });

  it('Should test view of cart page', function() {
    return this.browser
      .url('/cart')
      .assertView('cart', 'html')
  });
});
