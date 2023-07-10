import Product from "./products";

describe("Product unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product",  100.0);
        }).toThrowError("id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("1", "",  100.0);
        }).toThrowError("name is required");
    });

    it("should throw error when price is zero", () => {
        expect(() => {
            const product = new Product("1", "Product", 0);
        }).toThrowError("product can not be 0");
    });

    // WHY PASSED???
    // it("change name product",  () => {
    //     const product = new Product("1", "Product", 50.5);
    //     product.name = "Product 2";
    //     expect(product.name).toBe("Product 2");
    // });


    it("should change name",  () => {
        const product = new Product("1", "Product", 50.5);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price",  () => {
        const product = new Product("1", "Product", 50.5);
        product.changePrice(10.20);
        expect(product.price).toBe(10.2);
    });

});
