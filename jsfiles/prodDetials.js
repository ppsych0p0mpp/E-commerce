import { manageModalAccessibility } from 'jsfiles/modalutils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Manage modal accessibility when the page loads
    manageModalAccessibility('productDetailsModal'); 

    // Get the product details from localStorage
    const productDetails = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!productDetails) {
        console.log('No product details found.');
        document.getElementById('details').innerHTML = "<p>No product details available. Please go back and select a product.</p>";
        return;
    }

    // Populate the product image and information in the modal
    const productImageDiv = document.getElementById('product-image');
    productImageDiv.innerHTML = `<img src="${productDetails.image}" alt="${productDetails.name}" style="max-width: 100%; border-radius: 10px;">`;

    const productInfoDiv = document.getElementById('product-info');
    productInfoDiv.innerHTML = `
        <h2>${productDetails.name}</h2>
        <p><strong>Price:</strong> $${productDetails.price}</p>
        <p><strong>Description:</strong> ${productDetails.description}</p>
    `;
});
