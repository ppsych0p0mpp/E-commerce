document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartItemCount = document.getElementById('cartItemCount');

  
    // Populate cart details
    if (cart.length > 0) {
      cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');
        cartItem.innerHTML = `
          <div>
            <h6 class="my-0">${item.name}</h6>
            <small class="text-muted">Quantity: ${item.quantity}</small>
          </div>
          <span class="text-muted">$${item.price.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
  
      // Update total and item count
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
      cartItemCount.textContent = cart.length;
    } else {
      cartItemsContainer.innerHTML = `<li class="list-group-item text-center">Your cart is empty.</li>`;
    }
  
    // Handle form submission
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
      e.preventDefault();
  
      alert('Order placed successfully!');
      localStorage.removeItem('cart'); 
      window.location.href = 'index.html';
        
    });

  });
  
