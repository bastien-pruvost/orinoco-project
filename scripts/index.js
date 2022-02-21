// -- Global async function --
(async function () {
  const products = await getProducts();

  for (let product of products) {
    displayProduct(product);
  }

})();

// -- Function to get products from API --
function getProducts() {
  return fetch(`${apiUrl}/api/cameras`)
    .then(function (res) {
      return res.json();
    })
    .then(function (products) {
      return products;
    })
    .catch(function (err) {
      alert(err);
    });
}

// -- Function to dynamically display a product card in the html --
function displayProduct(product) {

  const productCardTemplate = document.getElementById("product-card-template");
  const productCardClone = document.importNode(productCardTemplate.content, true);

  productCardClone.getElementById("product-card").href = `./product.html?id=${product._id}`;
  productCardClone.getElementById("card-img").src = product.imageUrl;
  productCardClone.getElementById("card-img").alt = `Photo d'un ${product.name}`;
  productCardClone.getElementById("card-name").textContent = product.name;
  productCardClone.getElementById("card-price").textContent = `${product.price / 100} €`;

  document.getElementById("gallery").appendChild(productCardClone);
};

