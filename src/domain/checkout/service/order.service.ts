import Custumer from "../../customer/entity/custumers";
import OrderItem from "../entity/order_item";
import Orders from "../entity/orders";
import { v4 as uuid } from "uuid";

export default class OrderService {

    static calculateTotal(orders: Orders[]): number{
        return orders.reduce((acc, order) => acc + order.total(), 0)
    }

    static placeOrder(custumer: Custumer, itens: OrderItem[]): Orders{
        if(itens.length === 0 ){
            throw new Error("Order must have at least one item");
        }

        const order =  new Orders(uuid(), custumer.id, itens);
        custumer.addRewardPoints(order.total()/2);
        return order;
    }
}
