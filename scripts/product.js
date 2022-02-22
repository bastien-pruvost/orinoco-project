// -- Global async function --
(async function () {

  const productId = getProductId();
  const product = await getProduct(productId);
  displayProductContent(product);
  addToCart(product);

})();

// -- Function to get actual product id --
function getProductId() {
  return new URL(location.href).searchParams.get("id");
};

// -- Function to get actual product from API with retrieved Id --
function getProduct(productId) {
  return fetch(`${apiUrl}/api/cameras/${productId}`)
    .then(function (res) { return res.json() })
    .then(function (product) { return product })
    .catch(function (err) { alert(err) });
};

// -- Function to dynamically display the product content --
function displayProductContent(product) {

  document.getElementById("product-img").src = product.imageUrl;
  document.getElementById("product-img").alt = `Photo d'un ${product.name}`;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-desc").textContent = product.description;
  document.getElementById("product-price").textContent = `${product.price / 100} €`;

  // -- Dinamically display the lenses options --
  for (let lense of product.lenses) {

    const lenseTemplate = document.getElementById("lense-template");
    const lenseClone = document.importNode(lenseTemplate.content, true);

    lenseClone.getElementById("lense-option").textContent = lense;
    lenseClone.getElementById("lense-option").value = lense;

    document.getElementById("lense-select").appendChild(lenseClone);
  }
};

// -- Function to add the product in the cart --
function addToCart(product) {

  document.getElementById("add-to-cart").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // -- Get the quantity and type of lens that the user wants --
    const quantity = document.getElementById("quantity-select").value;
    const lense = document.getElementById("lense-select").value;

    // -- Const that contains the array retrieved in the Local Storage
    let localStorageCart = JSON.parse(localStorage.getItem("shopCart"));

    // -- Open the "go to cart" pop-up
    cartPopup(product, quantity, lense);

    // -- If there is already a cart array in Local Storage --
    if (localStorageCart) {

      // -- Push the product to the array according to quantity --
      for (let i = 0; i < quantity; i++) {
        localStorageCart.push(product._id);
      };

      // -- Put the array in Local Storage --
      localStorage.setItem("shopCart", JSON.stringify(localStorageCart));

      // -- If thers isn't a cart array in Local Storage --
    } else {
      // -- Create the array --
      let localStorageCart = [];

      // -- Push the product to the array according to quantity --
      for (let i = 0; i < quantity; i++) {
        localStorageCart.push(product._id);
      };

      // -- Put the array in Local Storage --
      localStorage.setItem("shopCart", JSON.stringify(localStorageCart));
    }
  })
};


// -- Function to open and close the "Go to cart" popup
function cartPopup(product, quantity, lense) {
  const cartPopup = document.getElementById("cart-popup");

  document.getElementById("popup-inject-name-lense").innerText = `${product.name} (Lentille ${lense})`
  document.getElementById("popup-inject-quantity").innerText = `Quantité : ${quantity}`

  cartPopup.classList.add("active")

  // -- Close popup if user click on "continue shopping"
  document.getElementById("continue-shopping-btn").addEventListener("click", function (e) {
    e.preventDefault();
    cartPopup.classList.remove("active")
  }, false);

  // -- Close popup if user click somewhere on the body --
  document.body.addEventListener("click", function (e) {
    if (!e.target.closest(".cart-popup") && cartPopup.classList.contains("active")) {
      e.preventDefault();
      cartPopup.classList.remove("active")
    }
  }, false)

}