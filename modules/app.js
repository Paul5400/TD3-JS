import { products, search } from "./products.js";
import { buildProductsList, displayCart } from "./ui.js";

export function init() {
    buildProductsList(products);
    displayCart();

    document.getElementById("search").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            const searchTerm = event.target.value.trim();
            buildProductsList(searchTerm ? search(searchTerm) : products);
        }
    });
}
