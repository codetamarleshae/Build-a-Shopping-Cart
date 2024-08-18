const products = [
    { productId: 1, name: 'Cherry', price: 1.5, quantity: 0, image: 'images/cherry.jpg' },
    { productId: 2, name: 'Orange', price: 2.25, quantity: 0, image: 'images/orange.jpg' },
    { productId: 3, name: 'Strawberry', price: 2.0, quantity: 0, image: 'images/strawberry.jpg' }
];

const productsContainer = document.querySelector('.products');
const cartContainer = document.querySelector('.cart');
const cartTotalElement = document.querySelector('.cart-total');
const paySummary = document.querySelector('.pay-summary');
const receivedInput = document.querySelector('.received');

let cart = [];
let totalPaid = 0; // variable to hold the remaining balance

// Displays the list of products on the page
function renderProducts() {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addProductToCart(${product.productId})">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// Displays the cart items on the page
function renderCart() {
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="increaseQuantity(${item.productId})">+</button>
            <button onclick="decreaseQuantity(${item.productId})">-</button>
            <button onclick="removeProductFromCart(${item.productId})">Remove</button>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
    updateCartTotal();
}

// Adds a product to the cart
function addProductToCart(productId) {
    const product = products.find(p => p.productId === productId);
    const cartItem = cart.find(item => item.productId === productId);
    cartItem ? cartItem.quantity++ : cart.push({ ...product, quantity: 1 });
    renderCart();
}

// Increases the quantity of a product in the cart
function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity++;
        renderCart();
    }
}

// Decreases the quantity of a product in the cart
function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity--;
        cartItem.quantity <= 0 ? removeProductFromCart(productId) : renderCart();
    }
}

// Removes a product from the cart
function removeProductFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    renderCart();
}

// Updates the total price of the cart
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Calculates the total price of the cart
function cartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Empties the cart
function emptyCart() {
    cart = [];
    renderCart();
}

// Handles the payment process
function pay(amount) {
    totalPaid += amount;
    return totalPaid - cartTotal();
}

// Handles the payment form submission
function handlePayment(event) {
    event.preventDefault();
    const received = parseFloat(receivedInput.value);
    const change = pay(received);
    // states payment succuessful if pay amount is equal or greater than the total of the cart. states insufficient amount if not
    paySummary.textContent = change >= 0 ? `Payment successful! Change: $${change.toFixed(2)}` : 'Insufficient amount received.';
}


renderProducts();

/* I've made sure all of my permissions were allowed for clipboard in my web browser and I'm unable to paste the test script into the terminal still.
 I'm not sure how to fix that issue. */