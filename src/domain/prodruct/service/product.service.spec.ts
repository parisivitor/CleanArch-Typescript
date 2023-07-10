import Product from "../entity/products";
import ProductService from "./product.service";


describe("Product service unit tests", () => {
    it("should change the prices of all products", () => {

        let product1 = new Product("p1", "produto 1", 10.0);
        let product2 = new Product("p2", "produto 2", 20.0);
        let product3 = new Product("p3", "produto 3", 30.0);

        ProductService.increasePrice([product1, product2, product3], 100);

        expect(product1.price).toBe(20.00)
        expect(product2.price).toBe(40.00)
        expect(product3.price).toBe(60.00)

        product1 = new Product("p1", "produto 1", 10.0);
        product2 = new Product("p2", "produto 2", 20.0);
        product3 = new Product("p3", "produto 3", 30.0);
        ProductService.increasePrice([product1, product2, product3], 50);

        expect(product1.price).toBe(15.00)
        expect(product2.price).toBe(30.00)
        expect(product3.price).toBe(45.00)

    });
})
