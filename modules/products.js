export class Product {
    constructor(ref, price, description,photo) {
        this.ref = ref;
        this.price = price;
        this.description = description;
        this.photo = photo;
    }
}

export const products = [
    new Product("P001", 29.99, "Flash Vodka","https://franprix.twic.pics/pim-product-images/2801454_0_M1_S1?twic=v1/output=jpeg/cover=420x-"),
    new Product("P002", 49.99, "Survetement Under Armour","https://i8.amplience.net/i/jpl/jd_706141_a?qlt=92"),
    new Product("P003", 19.99, "Veste Helvetica","https://photos6.spartoo.com/photos/248/24846102/24846102_1200_A.jpg"),
    new Product("P004", 99.99, "Gucci Fraise","https://cdna.lystit.com/photos/gucci/979c8953/gucci-Beige-GG-Baseball-Hat-With-Strawberry.jpeg"),
    new Product("P005", 999.99, "Sacoche LV","https://cdn1.jolicloset.com/img4/detail4b/2023/02/786028-1/sacs-louis-vuitton.jpg"),

];

export function search(keywords) {
    return products.filter(p =>
        p.ref.includes(keywords) || p.description.toLowerCase().includes(keywords.toLowerCase())
    );
}
