// -- Global function --
(function () {
  cartCounter();

})();

function cartCounter() {

  const localCart = JSON.parse(localStorage.getItem("shopCart"));
  let count;

  if (localCart) {
    count = localCart.length;
  } else {
    count = 0;
  }

  document.getElementById("cart-count").innerText = count;

};


