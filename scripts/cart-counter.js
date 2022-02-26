// -- Global function --
(function () {
  cartCounter();

})();

function cartCounter() {

  const localCart = JSON.parse(localStorage.getItem("shopCart"));
  let count = 0;

  if (localCart) {

    for (const product of localCart) {
      count += parseInt(product.productQuantity);
    }

  } else {
    count = 0;
  }

  document.getElementById("cart-count").innerText = count;

};
