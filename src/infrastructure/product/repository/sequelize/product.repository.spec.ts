import {IsUUID, Sequelize} from 'sequelize-typescript';
import ProductModel from './product.model';
import Product from '../../../../domain/prodruct/entity/products';
import ProductRepository from './product.repository';

describe("Product repository test", () => {
    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequileze.addModels([ProductModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100.30);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } })

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100.30
        });
    })

    it("sould update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100.30);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } })
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100.30
        });


        product.changeName("novo produto");
        product.changePrice(200.0);

        await productRepository.update(product);

        const newProductModel = await ProductModel.findOne({ where: { id: "1" } })
        expect(newProductModel.toJSON()).toStrictEqual({
            id: "1",
            name: "novo produto",
            price: 200
        });
    })

    it("sould find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100.30);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } })

        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    })

    it("sould find a product", async () => {
        const productRepository = new ProductRepository();

        const product1 = new Product("1", "Product 1", 100.30);
        await productRepository.create(product1)
        ;
        const product2 = new Product("2", "Product 2", 100.30);
        await productRepository.create(product2);

        const product3 = new Product("3", "Product 3", 100.30);
        await productRepository.create(product3);

        const foundProducts = await productRepository.findAll();
        const products = [product1, product2, product3];

        expect(products).toEqual(foundProducts);
    })
});
