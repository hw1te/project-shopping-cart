const fetchProducts = async (product) => {
  // seu código aqui
  if (!product) {
    throw new Error('You must provide an url.');
  }
  
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  const response = await fetch(url);
  const data = response.json();
  return data;
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
