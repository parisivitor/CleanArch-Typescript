import Product from "../entity/products";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number): void{
        products.forEach(product =>
            product.changePrice(product.price * (100 + percentage) / 100)
        )
    }
}
