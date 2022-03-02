// -- Global async function --
(async function () {
  const localStorageCart = JSON.parse(localStorage.getItem("shopCart"));
  const productId = getProductId();
  const product = await getProduct(productId);
  displayProductContent(product);
  rangeQuantity(product, localStorageCart);
  addToCart(product);

})()

// -- Function to get actual product id --
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

// -- Function to get actual product from API with retrieved Id --
async function getProduct(productId) {
  return fetch(`${apiUrl}/api/cameras/${productId}`)
    .then(function (res) { return res.json() })
    .then(function (product) { return product })
    .catch(function (err) { alert(err) });
}

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
}

// -- Function to limit the current article quantity to 99 --

function rangeQuantity(product, localStorageCart) {
  document.getElementById("quantity-select").addEventListener("input", (e) => {
    if (e.target.value) {
      if (e.target.value <= 0) {
        e.target.value = 1;
      }
      if (e.target.value > 99) {
        e.target.value = 99;
      }
    }
  })
}

// -- Function to add the product in the cart --
function addToCart(product) {

  document.getElementById("add-to-cart").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // -- Get the quantity and type of lens that the user wants --
    let quantity = parseInt(document.getElementById("quantity-select").value);
    const lense = document.getElementById("lense-select").value;

    if (!quantity) { quantity = 1 }

    // -- Const that contains the array retrieved in the Local Storage
    let localStorageCart = JSON.parse(localStorage.getItem("shopCart"));

    // -- Stock data product in an object --
    let productDataForCart = {
      productId: product._id,
      productImageUrl: product.imageUrl,
      productName: product.name,
      productPrice: product.price,
      productLense: lense,
      productQuantity: parseInt(quantity)
    }

    // -- Open the "go to cart" pop-up
    cartPopup(product, quantity, lense);

    // -- If there is already a cart array in Local Storage --
    if (localStorageCart) {

      // -- Const to know if the product is already in cart --
      let productAlreadyInCart = false;
      // -- Loop to check if the element is already in the cart --
      for (const cartItem of localStorageCart) {
        // -- If the product is already in cart, change quantity in the object --
        if (cartItem.productName === product.name && cartItem.productLense === lense) {
          cartItem.productQuantity += quantity;
          productAlreadyInCart = true;
          break;
        }
      }
      // -- If product is not already in cart add a new object with product data --
      if (productAlreadyInCart === false) {
        localStorageCart.push(productDataForCart);
      }

      // -- Put the new array in Local Storage --
      localStorage.setItem("shopCart", JSON.stringify(localStorageCart));

      // -- If thers isn't a cart array in Local Storage --
    } else {
      // -- Create the array --
      let localStorageCart = [];

      // -- Push the product object in the array --
      localStorageCart.push(productDataForCart);

      // -- Put the array in Local Storage --
      localStorage.setItem("shopCart", JSON.stringify(localStorageCart));
    }

    // -- Add the quantity in the cart counter --
    cartCounter();
  })
}


// -- Function to open and close the "Go to cart" popup
function cartPopup(product, quantity, lense) {
  const cartPopup = document.getElementById("cart-popup");

  document.getElementById("popup-inject-name-lense").innerText = `${product.name} (Lentille ${lense})`;
  document.getElementById("popup-inject-quantity").innerText = `Quantité : ${quantity}`;

  cartPopup.classList.add("active");

  // -- Close popup if user click on "continue shopping"
  document.getElementById("continue-shopping-btn").addEventListener("click", function (e) {
    e.preventDefault();
    cartPopup.classList.remove("active");
  })

  // -- Close popup if user click somewhere on the body --
  document.body.addEventListener("click", function (e) {
    if (!e.target.closest(".cart-popup") && cartPopup.classList.contains("active")) {
      e.preventDefault();
      cartPopup.classList.remove("active");
    }
  })
}