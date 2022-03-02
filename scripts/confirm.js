// -- Global function --
(async function () {

  const orderPrice = JSON.parse(localStorage.getItem("totalOrderPrice"));
  const orderId = new URL(location.href).searchParams.get("orderId");

  showOrderPrice(orderPrice);
  showOrderId(orderId);
  clearCart();

})()

function clearCart() {
  localStorage.removeItem("shopCart")
  cartCounter();
}

function showOrderPrice(orderPrice) {
  document.getElementById("order-price").textContent = `${orderPrice} €`
}

function showOrderId(orderId) {
  document.getElementById("order-id").textContent = `${orderId}`
}
