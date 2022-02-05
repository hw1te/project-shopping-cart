const getSavedCartItems = (element) => {
  // seu código aqui
  localStorage.getItem(element);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
