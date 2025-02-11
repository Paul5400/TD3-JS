(() => {
  // modules/products.js
  var Product = class {
    constructor(ref, price, description) {
      this.ref = ref;
      this.price = price;
      this.description = description;
    }
  };
  var products2 = [
    new Product("P001", 29.99, "Feur"),
    new Product("P002", 49.99, "Vlt du 94"),
    new Product("P003", 19.99, "He he"),
    new Product("P004", 99.99, "Mr Pichou")
  ];
  function search(keywords) {
    return products2.filter(
      (p) => p.ref.includes(keywords) || p.description.toLowerCase().includes(keywords.toLowerCase())
    );
  }

  // modules/cart.js
  var cart = {
    items: [],
    addToCart(product) {
      let item = this.items.find((i) => i.product.ref === product.ref);
      if (item) {
        item.qty++;
      } else {
        this.items.push({ product, qty: 1 });
      }
    },
    emptyCart() {
      this.items = [];
    },
    getTotal() {
      return this.items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    }
  };

  // modules/ui.js
  function displayProduct(product) {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
        <div class="photo">
            picto
            <a class="product-add2cart">
                <span class="mdi mdi-cart"></span>
            </a>
        </div>
        <div class="details">
            <div class="details-top">
                <strong class="bigger">${product.ref}</strong>
                <strong class="bigger">${product.price.toFixed(2)}\u20AC</strong>
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
  function buildProductsList(products3) {
    const productsContainer = document.getElementById("product-list");
    productsContainer.innerHTML = "";
    products3.forEach((product) => productsContainer.appendChild(displayProduct(product)));
  }
  function displayCart() {
    const cartContainer = document.getElementById("cart-content");
    cartContainer.innerHTML = `
        <tr><th>Produit</th><th>Quantit\xE9</th><th>Prix</th></tr>
        ${cart.items.map((item) => `
            <tr>
                <td>${item.product.ref}</td>
                <td>${item.qty}</td>
                <td>${(item.product.price * item.qty).toFixed(2)}\u20AC</td>
            </tr>
        `).join("")}
    `;
    document.getElementById("cart-total").textContent = `${cart.getTotal().toFixed(2)} \u20AC`;
    document.getElementById("total-products").textContent = cart.items.length;
    document.getElementById("empty-cart").addEventListener("click", () => {
      cart.emptyCart();
      displayCart();
    });
  }
  document.getElementById("product-search").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter(
      (product) => product.ref.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
    );
    buildProductsList(filteredProducts);
  });

  // modules/app.js
  function init() {
    buildProductsList(products2);
    displayCart();
    document.getElementById("search").addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        const searchTerm = event.target.value.trim();
        buildProductsList(searchTerm ? search(searchTerm) : products2);
      }
    });
  }

  // modules/main.js
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
})();
