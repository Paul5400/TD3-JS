import { cart } from "./cart.js";

function displayProduct(product) {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
        <h3>${product.ref}</h3>
        <p>${product.description}</p>
        <p>Prix: ${product.price.toFixed(2)}€</p>
        <button class="add-to-cart">Ajouter au panier</button>
    `;

    productDiv.querySelector(".add-to-cart").addEventListener("click", () => {
        cart.addToCart(product);
        displayCart();
    });

    return productDiv;
}

export function buildProductsList(products) {
    const productsContainer = document.getElementById("products-list");
    productsContainer.innerHTML = "";
    products.forEach(product => productsContainer.appendChild(displayProduct(product)));
}

export function displayCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = `
        <h2>Panier</h2>
        <table>
            <tr><th>Produit</th><th>Quantité</th><th>Prix</th></tr>
            ${cart.items.map(item => `
                <tr>
                    <td>${item.product.ref}</td>
                    <td>${item.qty}</td>
                    <td>${(item.product.price * item.qty).toFixed(2)}€</td>
                </tr>
            `).join("")}
        </table>
        <p>Total: ${cart.getTotal().toFixed(2)}€</p>
        <button id="empty-cart">Vider le panier</button>
    `;

    document.getElementById("empty-cart").addEventListener("click", () => {
        cart.emptyCart();
        displayCart();
    });
}
