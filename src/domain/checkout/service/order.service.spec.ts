import Custumer from "../../customer/entity/custumers";
import OrderItem from "../entity/order_item";
import Orders from "../entity/orders";
import OrderService from "./order.service";

describe("Order service test unit", () => {

    it("should place an order", () => {
        const custumer = new Custumer("c1", "custumer1");
        const item1 = new OrderItem('i1', 'item 1', 'p1', 10, 2);

        const order = OrderService.placeOrder(custumer, [item1]);

        expect(custumer.rewardPoints).toBe(10);
        expect(order.total()).toBe(20);
    });

    it("should place an order whithout items throw error", () => {
        const custumer = new Custumer("c1", "custumer1");
        expect(() => {
            OrderService.placeOrder(custumer, [])
        }).toThrowError("Order must have at least one item");
    });

    it("should return sun for all orders", () => {

        const item1 = new OrderItem('i1', 'item1', 'prod1', 10, 2);
        const item2 = new OrderItem('i2', 'item2', 'prod2', 20, 3);
        const order1 = new Orders('o1', 'c1', [item1, item2]);

        const item3 = new OrderItem('i1', 'item1', 'prod1', 10, 2);
        const item4 = new OrderItem('i2', 'item2', 'prod2', 10, 7);
        const order2 = new Orders('o1', 'c1', [item3, item4]);

        const total = OrderService.calculateTotal([order1, order2]);

        // expect(total).toBe(160);
        expect(OrderService.calculateTotal([order1, order2])).toBe(170);
    });
})
