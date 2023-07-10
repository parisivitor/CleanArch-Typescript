import { isExpressionWithTypeArguments } from 'typescript';
import { v4 as uuid } from 'uuid';
import OrderFacotory from './order.factory';

describe("Order factory unit test", () => {

    it ("should create an order", () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    productId: uuid(),
                    quantity: 1,
                    price: 100,
                },
            ]
        };

        const order = OrderFacotory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.custumerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);

    });
});
