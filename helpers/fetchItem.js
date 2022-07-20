const getUrl = (itemID) => `https://api.mercadolibre.com/items/${itemID}`;

const fetchItem = async (itemID) => {
  try {
    const url = getUrl(itemID);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
