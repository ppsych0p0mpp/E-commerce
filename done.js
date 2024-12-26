document.addEventListener("DOMContentLoaded", () => {
  const orderDetails = JSON.parse(sessionStorage.getItem("orderSummary"));

  if (orderDetails) {
    const orderItemsContainer = document.getElementById("orderItemsContainer");
    const orderTotalElement = document.getElementById("orderTotal");
    const paymentMethodElement = document.getElementById("paymentMethod");

    orderDetails.items.forEach((item) => {
      const orderItem = document.createElement("li");
      orderItem.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "lh-sm"
      );
      orderItem.innerHTML = `
        <div>
          <h6 class="my-0">${item.name}</h6>
          <small class="text-muted">Quantity: ${item.quantity}</small>
        </div>
        <span class="text-muted">$${item.price.toFixed(2)}</span>
      `;
      orderItemsContainer.appendChild(orderItem);
    });

    orderTotalElement.textContent = orderDetails.total;
    paymentMethodElement.textContent = orderDetails.paymentMethod;
  } else {
    document.body.innerHTML =
      '<p class="text-center">No order details available.</p>';
  }
});
