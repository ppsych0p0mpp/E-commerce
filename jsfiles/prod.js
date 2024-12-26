// Fetch the products data from products.json
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(category => {
            // Create an id for each section based on the category name
            const sectionId = category.category.toLowerCase().replace(/\s+/g, '-');
            const section = document.getElementById(sectionId);

            // Ensure the section is found before proceeding
            if (!section) {
                console.warn(`Section with ID "${sectionId}" not found`);
                return;
            }

            // Select the product container
            let prodContainer;

            if (category.category === "Drums") {
                prodContainer = section.querySelector('.drums-container');
            } else if (category.category === "Stratocaster") {
                prodContainer = section.querySelector('.prod-container');
            } else {
                prodContainer = section.querySelector('.prod-container');
            }

            // Store all products of this category for filtering
            category.products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('prod-item');

                const productImage = document.createElement('div');
                productImage.classList.add('prod-image');
                productImage.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
                productItem.appendChild(productImage);

                const productDetails = document.createElement('div');
                productDetails.classList.add('prod-details');
                productDetails.innerHTML = `
                    <h4 class="prod-name">${product.name}</h4>
                    <p class="prod-price">${product.price}</p>
                    <button class="btn add-to-cart">Add to Cart</button>
                    <button class="btn more-details">More details</button>
                `;
                
                // Add product data to the container for future filtering
                productItem.dataset.price = product.price.replace('$', '');
                productItem.dataset.brand = product.Brand.toLowerCase();
                productItem.dataset.stocks = product.stocks || '';
                productItem.dataset.dateAdded = product.dateAdded || '';

                productItem.appendChild(productDetails);
                prodContainer.appendChild(productItem);

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
        });

        // Event listener for the Apply Filters button
        document.getElementById('apply-filters').addEventListener('click', applyFilters);
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
    showCustomAlert(`${item.name} has been added to the cart.`); // Show custom alert instead of default alert
    renderCart(); // Render the cart in the modal
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

// Apply filters based on user selections
function applyFilters() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const brand = document.getElementById('brand-filter').value.toLowerCase() || '';

    // Loop through each product item and apply the filters
    const productItems = document.querySelectorAll('.prod-item');
    productItems.forEach(item => {
        const productPrice = parseFloat(item.dataset.price);
        const productBrand = item.dataset.brand;

        // Check if the product meets all selected filters
        const isPriceMatch = productPrice >= minPrice && productPrice <= maxPrice;
        const isBrandMatch = brand ? productBrand === brand : true;

        // Show or hide the product based on the filters
        if (isPriceMatch && isBrandMatch) {
            item.style.display = 'block';  // Show item
        } else {
            item.style.display = 'none';   // Hide item
        }
    });
}

// Function to populate and show the modal with product details
function showProductDetailsModal(product) {
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-image').alt = product.name;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = product.price;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-brand').textContent = `Brand: ${product.Brand}`;
    document.getElementById('modal-product-stocks').textContent = `Stocks: ${product.stocks || 'N/A'}`;

    // Show the Bootstrap modal
    var myModal = new bootstrap.Modal(document.getElementById('productDetailsModal'), {
        keyboard: false
    });
    myModal.show();
}

// Attach event listeners to "More details" buttons using event delegation
document.addEventListener('click', function(event) {
    if (event.target && event.target.matches('button.more-details')) {
        // Prevent the productItem click event from firing
        event.stopPropagation();

        // Find the closest prod-item div
        const productItem = event.target.closest('.prod-item');

        if (productItem) {
            // Retrieve product data from dataset
            const productData = {
                name: productItem.querySelector('.prod-name').textContent,
                image: productItem.querySelector('.prod-image img').src,
                price: productItem.querySelector('.prod-price').textContent,
                description: productItem.querySelector('.prod-description') ? productItem.querySelector('.prod-description').textContent : '',
                Brand: productItem.dataset.brand,
                stocks: productItem.dataset.stocks || '',
            };

            // Show the modal with product details
            showProductDetailsModal(productData);
        }
    }
});
