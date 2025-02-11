export const cart = {
    items: [],

    addToCart(product) {
        let item = this.items.find(i => i.product.ref === product.ref);
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
