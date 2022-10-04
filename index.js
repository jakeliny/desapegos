import { data } from './data.js';

const createProduct = (product) => {
  const productElement = document.createElement('div');
  productElement.classList.add('product');

  const productImageDiv = document.createElement('div');
  const productImage = `<img src="${product.images[0]}" data-position=0>`;
  const actionsButtonCaroussel = `<div class="actions"><button class="prev"><</button><button class="next">></button></div>`;
  productImageDiv.classList.add('product-image');
  productImageDiv.innerHTML = productImage + actionsButtonCaroussel;

  const productTitle = document.createElement('h2');
  productTitle.classList.add('product-title');
  productTitle.innerText = product.title;

  const productPrice = document.createElement('p');
  productPrice.classList.add('product-price');
  productPrice.innerText = product.price;

  const productDescription = document.createElement('p');
  productDescription.classList.add('product-description');
  productDescription.innerText = product.description;

  productElement.appendChild(productTitle);
  productElement.appendChild(productPrice);
  productElement.appendChild(productDescription);
  productElement.appendChild(productImageDiv);

  return productElement;
}

const createProducts = (products) => {
  const productsFragment = document.createDocumentFragment();

  for (let product of products) {
    const productElement = createProduct(product);
    productsFragment.appendChild(productElement);
  }
  return productsFragment;
}

const app = document.getElementById('app');
const products = createProducts(data);
app.appendChild(products);


const productImages = document.querySelectorAll('.product-image img');
const actions = document.querySelectorAll('.actions');

for (let i = 0; i < productImages.length; i++) {
  const productImage = productImages[i];
  const action = actions[i];

  action.addEventListener('click', (event) => {
    const target = event.target;
    const position = parseInt(productImage.dataset.position);
    const images = data[i].images;

    if (target.classList.contains('next')) {
      if (position === images.length - 1) {
        productImage.dataset.position = 0;
        productImage.src = images[0];
        return;
      }
      productImage.dataset.position = position + 1;
      productImage.src = images[position + 1];
      return;
    }

    if (position === 0) {
      productImage.dataset.position = images.length - 1;
      productImage.src = images[images.length - 1];
      return;
    }
    productImage.dataset.position = position - 1;
    productImage.src = images[position - 1];
    return;

  });
}