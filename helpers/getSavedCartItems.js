const getSavedCartItems = () => localStorage.cartItems;

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
