const list = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems('cartItems', list.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(event) {
  const cartParent = document.querySelector('.cart__items');
  const itemId = event.target.parentNode.firstChild.innerHTML;
  const item = await fetchItem(itemId);
  const itemObj = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  cartParent.appendChild(createCartItemElement(itemObj));
  // console.log('a')
}

function addButton() {
  const button = document.querySelectorAll('.item__add');
  
  button.forEach((index) => {
  index.addEventListener('click', addToCart);
  });
}

async function createItems() {
  const itemsList = document.querySelector('.items');
  const products = await fetchProducts('computador');

  products.results.forEach((product) => {
    const item = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    
    itemsList.appendChild(createProductItemElement(item));
  });
}

function emptyCart() {
  list.innerHTML = '';
  saveCartItems('cartItems', '');
}

const emptyButton = document.querySelector('.empty-cart');
emptyButton.addEventListener('click', emptyCart);

function loadSaved() {
  list.innerHTML = getSavedCartItems('cartItems');
}

function loadAPI(elementParent) {
  const element = createCustomElement('section', 'loading', 'carregando...');
  elementParent.appendChild(element);
}

function removeAPI(elementParent) {
  const element = document.querySelector('.loading');
  elementParent.removeChild(element);
}

window.onload = async () => {
  const element = document.querySelector('.items');
  loadAPI(element);
  await createItems();
  removeAPI(element);
  addButton();
  loadSaved();
};
