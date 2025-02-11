import { cart } from "./cart.js";

function displayProduct(product) {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
        <div class="photo">
            <img src="${product.photo}" alt="${product.ref}" style="width: 100%; height: 100%; object-fit: cover;">
            <a class="product-add2cart">
                <span class="mdi mdi-cart"></span>
            </a>
        </div>
        <div class="details">
            <div class="details-top">
                <strong class="bigger">${product.ref}</strong>
                <strong class="bigger">${product.price.toFixed(2)}€</strong>
            </div>
            <div class="details-description">
                ${product.description}
            </div>
        </div>
    `;

    productDiv.querySelector(".product-add2cart").addEventListener("click", () => {
        cart.addToCart(product);
        displayCart();
    });

    return productDiv;
}

export function buildProductsList(products) {
    const productsContainer = document.getElementById("product-list");
    productsContainer.innerHTML = "";
    products.forEach(product => productsContainer.appendChild(displayProduct(product)));
}

export function displayCart() {
    const cartContainer = document.getElementById("cart-content");
    cartContainer.innerHTML = `
        <tr><th>Produit</th><th>Quantité</th><th>Prix</th></tr>
        ${cart.items.map(item => `
            <tr>
                <td>${item.product.ref}</td>
                <td>${item.qty}</td>
                <td>${(item.product.price * item.qty).toFixed(2)}€</td>
            </tr>
        `).join("")}
    `;
    document.getElementById("cart-total").textContent = `${cart.getTotal().toFixed(2)} €`;
    document.getElementById("total-products").textContent = cart.items.length;

    document.getElementById("empty-cart").addEventListener("click", () => {
        cart.emptyCart();
        displayCart();
    });
}

document.getElementById("product-search").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.ref.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    buildProductsList(filteredProducts);
});