// Fetch the products data from the JSON file
fetch('products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  })
  .then(data => {
    // Filter for the Piano and Keyboard category
    const pianoCategory = data.find(category => category.category === "Piano and Keyboard");

    if (!pianoCategory) {
      console.error("Piano and Keyboard category not found in JSON data");
      return;
    }

    // Get the product container for the Piano and Keyboard section
    const productContainer = document.querySelector('#piano-and-keyboard .product-container');

    if (!productContainer) {
      console.error("Product container for Piano and Keyboard not found");
      return;
    }

    // Loop through each product and add it to the DOM
    pianoCategory.products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');

      // Product Image
      const productImage = document.createElement('div');
      productImage.classList.add('product-image');
      productImage.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
      productItem.appendChild(productImage);

      // Product Details
      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      productDetails.innerHTML = `
        <h4 class="product-name">${product.name}</h4>
        <p class="product-price">${product.price}</p>
       
        <button class="add-to-cart">Add to Cart</button>
        <button class="btn more-details" data-bs-toggle="modal" data-bs-target="#productDetailsModal">More details</button>
      `;

      // Add click event to show modal with product details
      const moreDetailsButton = productDetails.querySelector('.more-details');
      moreDetailsButton.addEventListener('click', () => {
        // Set modal content dynamically
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-name').innerText = product.name;
        document.getElementById('modal-product-price').innerText = product.price;
        document.getElementById('modal-product-description').innerText = product.description;
      });

      productItem.appendChild(productDetails);
      productContainer.appendChild(productItem);
        // Add event listener for the "Add to Cart" button
        productItem.querySelector('.add-to-cart').addEventListener('click', () => {
          const cartItem = {
              name: product.name,
              image: product.image,
              price: parseFloat(product.price.replace('$', '')),
              quantity: 1 // Default to 1
          };
          addToCart(cartItem);
      });
    });
  })
  .catch(error => console.error('Error loading products:', error));
// Add to Cart function
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(cartItem => cartItem.name === item.name);
  if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if item already in cart
  } else {
      cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showCustomAlert(`${item.name} has been added to the cart.`);
  renderCart(); // Render the cart in the modal

  
}

// Render the cart in the modal
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');

  cartItemsContainer.innerHTML = ''; // Clear existing cart items
  let total = 0;

  cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.name}</td>
          <td>
              <input type="number" class="form-control" value="${item.quantity}" min="1" 
                  onchange="updateCartQuantity(${index}, this.value)">
          </td>
          <td>$${item.price}</td>
          <td>$${(item.price * item.quantity)}</td>
          <td>
              <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
          </td>
      `;

      cartItemsContainer.appendChild(row);
  });

  cartTotalContainer.textContent = `$${total}`;
}

// Update cart item quantity
function updateCartQuantity(index, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const newQuantity = parseInt(quantity);

  if (newQuantity > 0) {
      cart[index].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); // Update the modal
  }
}

// Remove item from the cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Remove the item
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Update the modal
} 

// Custom alert function
function showCustomAlert(message) {
  const customAlert = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  const closeAlertBtn = document.getElementById('closeAlert');

  alertMessage.textContent = message;  // Set the custom message
  customAlert.style.display = 'flex';  // Show the custom alert

  // Close the custom alert when the "OK" button is clicked
  closeAlertBtn.addEventListener('click', function() {
      customAlert.style.display = 'none'; // Hide the alert after user clicks OK
  }, { once: true }); // Ensures the event listener is triggered only once

  // Optionally, close the alert after a brief delay
  setTimeout(function() {
      customAlert.style.display = 'none'; 
  }, 2000);  
}
