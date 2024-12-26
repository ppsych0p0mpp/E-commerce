document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const productContainer = document.querySelector('.prod-container'); // Adjust selector if necessary
    const cartItemsContainer = document.getElementById('cart-items'); // Cart modal container
    const cartTotalContainer = document.getElementById('cart-total'); // Total price container

    let allProducts = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fetch products from products.json
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data.flatMap(category =>
                category.products.map(product => ({
                    ...product,
                    category: category.category
                }))
            );
        })
        .catch(error => console.error('Error loading products:', error));

    // Handle search form submission
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();

        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        renderFilteredProducts(filteredProducts);
    });

    // Function to render products
    function renderFilteredProducts(products) {
        productContainer.innerHTML = ''; // Clear the container

        if (products.length === 0) {
            productContainer.innerHTML = '<p>No products found.</p>';
            return;
        }

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('prod-item');

            productItem.innerHTML = `
                <div class="prod-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="prod-details">
                    <h4 class="prod-name">${product.name}</h4>
                    <p class="prod-price">${product.price}</p>
                    <button class="btn add-to-cart">Add to Cart</button>
                    <button class="btn more-details">More Details</button>
                </div>
            `;

            // Add event listener to "Add to Cart" button
            productItem.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart({
                    name: product.name,
                    image: product.image,
                    price: parseFloat(product.price.replace('$', '')),
                    quantity: 1
                });
            });

            // Add event listener to "More Details" button
            productItem.querySelector('.more-details').addEventListener('click', () => {
                populateProductDetailsModal({
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    description: product.description || 'No description available.',
                    brand: product.Brand || 'Unknown brand',
                    stocks: product.stocks || 'Out of stock',
                });

                const modal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
                modal.show();
            });

            productContainer.appendChild(productItem);
        });
    }

    // Add to Cart function
    function addToCart(product) {
        const existingProduct = cart.find(cartItem => cartItem.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increment quantity
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to the cart.`);
        renderCart(); // Update the cart modal
    }

    // Render Cart in Modal
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear the container
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
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
                </td>
            `;

            cartItemsContainer.appendChild(row);
        });

        cartTotalContainer.textContent = `$${total.toFixed(2)}`;
    }

    // Update cart item quantity
    window.updateCartQuantity = (index, quantity) => {
        const newQuantity = parseInt(quantity, 10);

        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    };

    // Remove item from the cart
    window.removeFromCart = (index) => {
        cart.splice(index, 1); // Remove item
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    // Render cart on page load
    renderCart();

    // Function to populate product details modal
    function populateProductDetailsModal(product) {
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-image').alt = product.name;
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-price').textContent = product.price;
        document.getElementById('modal-product-description').textContent = product.description;
        document.getElementById('modal-product-brand').textContent = `Brand: ${product.brand}`;
        document.getElementById('modal-product-stocks').textContent = `Stocks: ${product.stocks}`;
    }
});
