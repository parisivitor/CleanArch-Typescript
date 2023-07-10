import OrderItem from "../entity/order_item";
import Orders from "../entity/orders";

interface OrderFacotoryProps{
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number
    }[]
}

export default class OrderFacotory {
    public static create(props: OrderFacotoryProps): Orders {
        const items = props.items.map(item => {
            return new OrderItem(item.id, item.name, item.productId, item.price, item.quantity)
        })
        return new Orders(props.id, props.customerId, items)
    }
}
