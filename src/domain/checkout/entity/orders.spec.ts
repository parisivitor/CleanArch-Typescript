import exp from "constants";
import OrderItem from "./order_item";
import Orders from "./orders";

describe("Orders unit test", () => {

    it("should trow error when id is empty", () => {
        expect(() => {
            let order = new Orders("", "", []);
        }).toThrowError('id is required');
    })

    it("should throw error when custumerID is empty", () => {
        expect(() => {
            let order = new Orders("1", "", []);
        }).toThrowError('custumerID is required');
    })

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Orders("1", "1", []);
        }).toThrowError('items is required');
    })


    it("total", () => {
        const item1 = new OrderItem("i1", "p1", "item 1", 10, 2);
        const item2 = new OrderItem("i2", "p2", "item 2", 20, 3);
        const order = new Orders("1", "1" , [item1, item2]);

        let total = order.total();

        expect(total).toBe(80)
    })

    it("should throw error if the item qtd is less or equal zero", () => {
        expect(() => {
            const item1 = new OrderItem("i1", "p1", "item 1", 10, 0);
            const order = new Orders("1", "1" , [item1]);
        }).toThrowError("quantity is must be greater than zero");
    })


});
