export class Product {
    constructor(ref, price, description) {
        this.ref = ref;
        this.price = price;
        this.description = description;
    }
}

export const products = [
    new Product("P001", 29.99, "Feur"),
    new Product("P002", 49.99, "Vlt du 94"),
    new Product("P003", 19.99, "He he"),
    new Product("P004", 99.99, "Mr Pichou"),

];

export function search(keywords) {
    return products.filter(p =>
        p.ref.includes(keywords) || p.description.toLowerCase().includes(keywords.toLowerCase())
    );
}
