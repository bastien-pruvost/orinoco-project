(async function () {
  const localStorageCart = JSON.parse(localStorage.getItem("shopCart"));
  for (let cartItem of localStorageCart) {
    displayCartItem(cartItem);
  }

  displayTotalOrderPrice(localStorageCart);
  changeQuantity(localStorageCart);
  deleteItem(localStorageCart);
  displayProductCount();
  policyChecker();
  formChecker();
  sendOrder(localStorageCart);
})();

// ------------ Cart features ------------

// -- Display an item in the cart list --
function displayCartItem(cartItem) {
  const cartItemTemplate = document.getElementById("cart-product-template");
  const cartItemClone = document.importNode(cartItemTemplate.content, true);

  // -- Display details of the product --
  cartItemClone.getElementById("img-name-lense").href = `./product.html?id=${cartItem.productId}`;
  cartItemClone.getElementById("cart-product-img").src = cartItem.productImageUrl;
  cartItemClone.getElementById("cart-product-img").alt = `Photo d'un ${cartItem.productName}`;
  cartItemClone.getElementById("cart-product-name").textContent = cartItem.productName;
  cartItemClone.getElementById("cart-product-lense").textContent = cartItem.productLense;
  cartItemClone.getElementById("cart-product-price").textContent = `${cartItem.productPrice / 100} €`;
  cartItemClone.getElementById("cart-product-quantity").value = `${cartItem.productQuantity}`;
  cartItemClone.getElementById("cart-product-total-price").textContent = `${cartItem.productPrice * cartItem.productQuantity / 100} €`;

  // -- Datasets are there to assign the delete button and quantity input to the right objects when they are used --
  cartItemClone.getElementById("cart-product-quantity").dataset.productName = cartItem.productName;
  cartItemClone.getElementById("cart-product-quantity").dataset.productLense = cartItem.productLense;
  cartItemClone.getElementById("cart-product-total-price").dataset.productName = cartItem.productName;
  cartItemClone.getElementById("cart-product-total-price").dataset.productLense = cartItem.productLense;
  cartItemClone.getElementById("delete-button").dataset.productName = cartItem.productName;
  cartItemClone.getElementById("delete-button").dataset.productLense = cartItem.productLense;

  document.getElementById("cart-summary-list").appendChild(cartItemClone);
}

// -- Refresh the total order price when the function is called --
function displayTotalOrderPrice(localStorageCart) {
  let totalOrderPrice = 0;
  for (const cartItem of localStorageCart) {
    totalOrderPrice += (cartItem.productPrice * cartItem.productQuantity / 100);
  }
  document.getElementById("inject-total-order-price").textContent = `${totalOrderPrice} €`;
}

// -- Allows the user to change the quantity with the inputs --
function changeQuantity(localStorageCart) {
  const quantityInputs = document.querySelectorAll(".cart-product-quantity");

  quantityInputs.forEach(input => {
    input.addEventListener("input", (e) => {

      // -- Limit the quantity from 1 to 999 --
      rangeQuantity(e);

      for (const cartItem of localStorageCart) {

        // -- Use the datasets to target the right object when we use quantity input --
        if (cartItem.productName === e.target.dataset.productName && cartItem.productLense === e.target.dataset.productLense) {

          // -- Change the quantity in the right object in cart array --
          cartItem.productQuantity = parseInt(e.target.value);

          // -- Put the new array in local storage --
          localStorage.setItem("shopCart", JSON.stringify(localStorageCart));

          // -- Refresh the product total price when we change quantity --
          e.target.parentElement.nextElementSibling.textContent = `${cartItem.productQuantity * cartItem.productPrice / 100} €`;
        }
      }
      // -- Refresh the total order price and the two products counter in the header and in the cart --
      displayTotalOrderPrice(localStorageCart);
      displayProductCount()
      cartCounter();
    })
  })
}

// -- Allows the user to delete an item in the cart --
function deleteItem(localStorageCart) {
  const deleteButtons = document.querySelectorAll("#delete-button");

  deleteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      for (let i = 0; i < localStorageCart.length; i++) {

        // -- Use the datasets to target the right object when user push delete buttons --
        if (localStorageCart[i].productName === e.target.dataset.productName && localStorageCart[i].productLense === e.target.dataset.productLense) {
          // -- Delete the right object in the cart array --
          localStorageCart.splice(i, 1);

          // -- Put the new array in local storage
          localStorage.setItem("shopCart", JSON.stringify(localStorageCart));
          // -- Immediately remove the element in the cart so that the user does not have to refresh the page --
          button.parentElement.parentElement.remove();

          // -- Refresh order price and counters --
          displayTotalOrderPrice(localStorageCart);
          cartCounter();
          displayProductCount();
        }
      }
    })
  })
}

// -- Function to refresh the product count in the cart --
function displayProductCount() {
  document.getElementById("products-count").textContent = `${cartCounter()} Articles`
}

// -- Function to limit the quantity from 1 to 999
function rangeQuantity(e) {
  if (e.target.value) {
    if (e.target.value <= 0) {
      e.target.value = 1;
    }
    if (e.target.value > 999) {
      e.target.value = 999;
    }
  }
}


// -------------------- Form checker --------------------

let firstnameOutput, lastnameOutput, emailOutput, addressOutput, cityOutput, policyOutput;

// -- Function to display an error message under specific input --
function errorDisplay(tag, message, valid) {
  const container = document.getElementById(`${tag}-container`)
  const span = document.querySelector(`#${tag}-container > .alert`)

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
}

// -- Function bellow is to check validity of each inputs --
function firstnameChecker(value) {
  if (value.length < 2 || value.length > 30) {
    errorDisplay("firstname", "Doit contenir entre 2 et 30 caractères");
    firstnameOutput = null;
  } else if (!value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)) {
    errorDisplay("firstname", "Doit contenir que des lettres ou lettres avec accents");
    firstnameOutput = null;
  } else {
    errorDisplay("firstname", "", true);
    firstnameOutput = value;
  }
}

function lastnameChecker(value) {
  if (value.length < 2 || value.length > 30) {
    errorDisplay("lastname", "Doit contenir entre 2 et 30 caractères");
    lastnameOutput = null;
  } else if (!value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)) {
    errorDisplay("lastname", "Doit contenir que des lettres ou lettres avec accents");
    lastnameOutput = null;
  } else {
    errorDisplay("lastname", "", true);
    lastnameOutput = value;
  }
}

function emailChecker(value) {
  if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errorDisplay("email", "Le format d'adresse mail est incorrect");
    emailOutput = null;
  } else {
    errorDisplay("email", "", true);
    emailOutput = value;
  }
}

function addressChecker(value) {
  if (value.length < 5 || value.length > 80) {
    errorDisplay("address", "Doit contenir entre 5 et 80 caractères");
    addressOutput = null;
  } else if (!value.match(/^['0-9 A-Za-zÀ-ÖØ-öø-ÿ-]+$/)) {
    errorDisplay("address", "Doit contenir uniquement des chiffre, des lettres ou lettres avec accents");
    addressOutput = null;
  } else {
    errorDisplay("address", "", true);
    addressOutput = value;
  }
}

function zipChecker(value) {
  if (!value.match(/^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/i)) {
    errorDisplay("zip", "Code postal incorrect");
    zipOutput = null;
  } else {
    errorDisplay("zip", "", true);
    zipOutput = value;
  }
}

function cityChecker(value) {
  if (value.length < 2 || value.length > 40) {
    errorDisplay("city", "Doit contenir entre 2 et 40 caractères");
    cityOutput = null;
  } else if (!value.match(/[A-Za-zÀ-ÖØ-öø-ÿ-]+$/i)) {
    errorDisplay("city", "Ne doit contenir que des lettres");
    cityOutput = null;
  } else {
    errorDisplay("city", "", true);
    cityOutput = value;
  }
}

function policyChecker() {
  document.getElementById("policy-check").addEventListener("change", function (e) {
    if (e.target.checked) {
      policyOutput = true;
    } else {
      policyOutput = false;
    }
  })
}

// -- Function to check form validity --
function formChecker() {

  const inputs = document.querySelectorAll("form input[type=text]");
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {

      switch (e.target.id) {
        case "firstname":
          firstnameChecker(e.target.value);
          break;
        case "lastname":
          lastnameChecker(e.target.value);
          break;
        case "email":
          emailChecker(e.target.value);
          break;
        case "address":
          addressChecker(e.target.value);
          break;
        case "zip":
          zipChecker(e.target.value);
          break;
        case "city":
          cityChecker(e.target.value);
          break;
        default:
          null;
      }
    });
  });
}

function sendOrder(localStorageCart) {
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    if ((firstnameOutput && lastnameOutput && emailOutput && addressOutput && zipOutput && cityOutput && policyOutput)) {

      let products = [];
      for (const cartItem of localStorageCart) {
        for (let i = 0; i < cartItem.productQuantity; i++) {
          products.push(cartItem.productId)
        }
      }

      const order = {
        contact: {
          firstName: firstnameOutput,
          lastName: lastnameOutput,
          address: addressOutput,
          city: cityOutput,
          email: emailOutput,
        },
        products: products,
      }

      const requestSettings = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json", },
      }

      fetch(`${apiUrl}/api/cameras/order`, requestSettings)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("order", JSON.stringify(data));
        })
        .catch((err) => console.log("erreur : " + err))

    } else if (firstnameOutput && lastnameOutput && emailOutput && addressOutput && zipOutput && cityOutput && !policyOutput) {
      errorDisplay("policy", "Veuillez accepter les CGV en cochant la case")
    } else {
      errorDisplay("submit", "Veuillez renseigner correctement les informations pour valider la commande")
    }
  });
}