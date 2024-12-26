// Fetch data from JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        populateHeroCarousel(data.heroCarousel);
        populateCounter(data.counterSection);
        populateFeaturedProducts(data.featuredProducts);
        populateCategories(data.categories);
    })
    .catch(error => console.error('Error fetching products:', error));

// Populate the hero carousel section
function populateHeroCarousel(heroItems) {
    const carouselContainer = document.getElementById('hero-carousel');
    heroItems.forEach(item => {
        carouselContainer.innerHTML += `
            <div class="carousel-item active">
                <img src="${item.image}" alt="Hero Image">
                <div class="carousel-text">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <a href="${item.buttonLink}" class="btn btn-hero">${item.buttonText}</a>
                </div>
            </div>
        `;
    });
}

// Populate the counter section
function populateCounter(counters) {
    const counterContainer = document.getElementById('counter');
    counters.forEach(counter => {
        counterContainer.innerHTML += `
            <div class="counter-item">
                <h3 id="${counter.countId}">${counter.initialCount}</h3>
                <p>${counter.label}</p>
            </div>
        `;
    });
}

// Populate the featured products section
function populateFeaturedProducts(products) {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="btn">${product.buttonText}</button>
            </div>
        `;
    });
}

// Populate the categories section
function populateCategories(categories) {
    const categoryGrid = document.getElementById('category-grid');
    categories.forEach(category => {
        categoryGrid.innerHTML += `
            <div class="category-item">
                <img src="${category.image}" alt="${category.name}" class="${category.class || ''}">
                <h3>${category.name}</h3>
            </div>
        `;
    });
}
