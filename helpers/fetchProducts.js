const getProduct = (product) => `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

const fetchProducts = async (product) => {
  // Essa função retorna a lista de produtos caso o parâmetro seja uma url válida.
  try {
    if (product === undefined) {
      throw new Error('You must provide an url');
    }
    const url = getProduct(product);
    const response = await fetch(url);
    const produtos = await response.json();
    return produtos;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
