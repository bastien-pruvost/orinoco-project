// -- Global function --
(async function () {
  const localStorageCart = JSON.parse(localStorage.getItem("shopCart"));

  for (let cartItem of localStorageCart) {
    displayCartItem(cartItem);
  }

  displayTotalOrderPrice(localStorageCart);
  changeQuantity(localStorageCart);
  deleteItem(localStorageCart);
  displayProductCount();

})();

// -- Display an item in the cart list --
function displayCartItem(cartItem) {
  const cartItemTemplate = document.getElementById("cart-product-template");
  const cartItemClone = document.importNode(cartItemTemplate.content, true);

  cartItemClone.getElementById("img-name-lense").href = `./product.html?id=${cartItem.productId}`;
  cartItemClone.getElementById("cart-product-img").src = cartItem.productImageUrl;
  cartItemClone.getElementById("cart-product-img").alt = `Photo d'un ${cartItem.productName}`;
  cartItemClone.getElementById("cart-product-name").textContent = cartItem.productName;
  cartItemClone.getElementById("cart-product-lense").textContent = cartItem.productLense;
  cartItemClone.getElementById("cart-product-price").textContent = `${cartItem.productPrice / 100} €`;
  cartItemClone.getElementById("cart-product-quantity").value = `${cartItem.productQuantity}`;
  cartItemClone.getElementById("cart-product-quantity").dataset.productName = cartItem.productName;
  cartItemClone.getElementById("cart-product-quantity").dataset.productLense = cartItem.productLense;
  cartItemClone.getElementById("cart-product-total-price").textContent = `${cartItem.productPrice * cartItem.productQuantity / 100} €`;

  cartItemClone.getElementById("cart-product-total-price").dataset.productName = cartItem.productName;
  cartItemClone.getElementById("cart-product-total-price").dataset.productLense = cartItem.productLense;
  cartItemClone.getElementById("delete-button").dataset.productName = cartItem.productName;
  cartItemClone.getElementById("delete-button").dataset.productLense = cartItem.productLense;

  document.getElementById("cart-summary-list").appendChild(cartItemClone);
}

function displayTotalOrderPrice(localStorageCart) {
  let totalOrderPrice = 0;
  for (const cartItem of localStorageCart) {
    totalOrderPrice += (cartItem.productPrice * cartItem.productQuantity / 100);
  }
  document.getElementById("inject-total-order-price").textContent = `${totalOrderPrice} €`;
}


function changeQuantity(localStorageCart) {
  const quantityInputs = document.querySelectorAll(".cart-product-quantity");

  quantityInputs.forEach(input => {

    input.addEventListener("input", (e) => {

      for (const cartItem of localStorageCart) {
        if (cartItem.productName === e.target.dataset.productName && cartItem.productLense === e.target.dataset.productLense) {
          console.log(e.target.value);
          quantityRangeLimiter(e, cartItem);
          cartItem.productQuantity = parseInt(e.target.value);
          localStorage.setItem("shopCart", JSON.stringify(localStorageCart));

          e.target.parentElement.nextElementSibling.textContent = `${cartItem.productQuantity * cartItem.productPrice / 100} €`
        }
      }

      displayTotalOrderPrice(localStorageCart);
      cartCounter();
      displayProductCount()
    });
  });
}

function deleteItem(localStorageCart) {
  const deleteButtons = document.querySelectorAll("#delete-button");

  deleteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      for (let i = 0; i < localStorageCart.length; i++) {

        if (localStorageCart[i].productName === e.target.dataset.productName && localStorageCart[i].productLense === e.target.dataset.productLense) {
          localStorageCart.splice(i, 1);
          localStorage.setItem("shopCart", JSON.stringify(localStorageCart));
          button.parentElement.parentElement.remove();
          displayTotalOrderPrice(localStorageCart);
          cartCounter();
          displayProductCount();
        }
      }
    })
  });
}

function displayProductCount() {
  document.getElementById("products-count").textContent = `${cartCounter()} Articles`
}

function quantityRangeLimiter(e, cartItem) {
  // AJOUTER EVENT LISTENER KEYDOWN !!! 
}
