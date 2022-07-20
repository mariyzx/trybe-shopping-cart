const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const sectionItem = document.querySelector('.items');

// Loading.. aparecendo enquanto a requisição da API não termina;
const createLoading = () => {
  const sectionLoading = document.createElement('section');
  const eltoLoading = document.createElement('p');
  eltoLoading.innerHTML = 'carregando...';
  sectionLoading.classList.add('loading');
  sectionLoading.appendChild(eltoLoading);
  const sectionContainer = document.querySelector('.items');
  sectionContainer.appendChild(sectionLoading);
};

const removeLoading = () => {
  const sectionLoading = document.querySelector('.loading');
  sectionLoading.remove();
};

const fetchCreate = async () => {
  // A função fetchCreate percorre os produtos e adiciona o objeto de chaves como parametros da função acima para criar
  // a visualização dos determinados produtos
  createLoading();
  const fetchComputer = await fetchProducts('computador');
  document.querySelector('.loading').style.display = 'none';
  removeLoading();
  const produtos = fetchComputer.results;
  produtos.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image } = produto; // desestruturação do objeto;
    const itemAdicionado = createProductItemElement({ sku, name, image });
    
    sectionItem.appendChild(itemAdicionado);
  });
};

fetchCreate();

/* const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText; */

// cria uma tag p no meu carrinho que corresponde ao total;
const strTotal = document.createElement('p');

// cria um contador que retorna a soma de todos os preços;
const returnPreço = () => {
const Li = document.querySelectorAll('.cart__item');
const arrAux = [];
for (let i = 0; i < Li.length; i += 1) {
  const aux = Li[i].innerHTML.replace('$', ' ');
  const arrPreço = aux.split(' ');
  const preço = Number(arrPreço[arrPreço.length - 1]);
  arrAux.push(preço);
}
const somaPreços = arrAux.reduce((total, preço) => total + preço, 0);

strTotal.innerText = `R$: ${somaPreços.toFixed(2)}`;
// adiciona strTotal como filho do meu carrinho;
const meuCarrinho = document.querySelector('.cart');
meuCarrinho.appendChild(strTotal);
strTotal.classList.add('total-price');
};

const cartItemClickListener = (event) => {
  // Remove o item do carrinho de compras
  const evento = event.target;
  if (evento.classList.contains('cart__item')) {
    evento.remove();
    returnPreço();
  }
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

window.addEventListener('click', async (event) => {
  // Adiciona o item clicado ao carrinho;
  if (event.target.classList.contains('item__add')) {
    const section = event.target.parentElement;
    const idItem = section.querySelector('.item__sku').innerText; // retorna apenas o ID do elemento clicado
  
    const response = await fetchItem(idItem);
    const { id: sku, title: name, price: salePrice } = response;
    const result = createCartItemElement({ sku, name, salePrice });
    
    const cartItems = document.getElementsByClassName('cart__items')[0];
    cartItems.appendChild(result);

    saveCartItems(cartItems.innerHTML);
    returnPreço();
  }
});

const returnSavedItems = () => {
  if (localStorage.cartItems) {
    // caso tenha algo no localStorage ele retorna esse elemento 
    const cartItems = document.querySelector('.cart__items');
    cartItems.innerHTML = localStorage.cartItems;
    returnPreço();
  }
};

returnSavedItems();

// remove com o click as li's que estão sendo requisitadas pelo localStorage;
const lis = document.getElementsByTagName('li');
for (let i = 0; i < lis.length; i += 1) {
  lis[i].addEventListener('click', cartItemClickListener);
} 

// Botão esvaziar carrinho sendo implementado:
const ol = document.getElementsByClassName('cart__items');
const emptyCart = document.getElementsByClassName('empty-cart');
emptyCart[0].addEventListener('click', () => {
  for (let i = 0; i < lis.length; i += 1) {
    ol[0].innerHTML = '';
    returnPreço();
  }
});

window.onload = () => { 
  getSavedCartItems(); 
};
