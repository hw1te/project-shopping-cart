const saveCartItems = (element, items) => {
  // seu código aqui
  localStorage.setItem(element, items);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
