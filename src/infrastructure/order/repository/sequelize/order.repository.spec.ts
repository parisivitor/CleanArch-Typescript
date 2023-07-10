import { Sequelize } from 'sequelize-typescript';
import CustumerModel from '../../../customer/repository/sequelize/custumer.model';
import ProductModel from '../../../product/repository/sequelize/product.model';
import Custumer from '../../../../domain/customer/entity/custumers';
import Address from '../../../../domain/customer/value-object/address';
import Product from '../../../../domain/prodruct/entity/products';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import OrderRepository from './order.repository';
import OrderItemModel from './order-item.model';
import Orders from '../../../../domain/checkout/entity/orders';
import OrderModel from './order.model';
import CustumerRepository from '../../../customer/repository/sequelize/custumer.repository';
import ProductRepository from '../../../product/repository/sequelize/product.repository';

describe("Order repository test", () => {
    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequileze.addModels([CustumerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should create a new order",async () => {
        const custumerRepository = new CustumerRepository();
        const custumer = new Custumer("1", "custumer 1");
        custumer.Address = new Address("s1", "c1", "s1", "zip1", "country1");
        custumer.addRewardPoints(20);
        custumer.activate();
        await custumerRepository.create(custumer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100.30);
        await productRepository.create(product);

        // const orderItemRepository = new OrderItemRe
        const orderItem = new OrderItem("1", product.name, product.id, product.price, 2);


        const orderRepository = new OrderRepository();
        const order = new Orders("1", custumer.id, [orderItem])
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            custumer_id: custumer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    product_id: orderItem.id,
                    name: orderItem.name,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    order_id: order.id
                }
            ]
        })
    })
});
