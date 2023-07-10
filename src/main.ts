import Address from './domain/customer/value-object/address';
import Custumer from './domain/customer/entity/custumers';
import OrderItem from './domain/checkout/entity/order_item';
import Orders from './domain/customer/entity/orders';

let custumer = new Custumer('10', 'Vitao');
custumer.Address = new Address('rua 1', 'sjrp', 'sp', '123', 'br');
custumer.activate();


const item1 = new OrderItem('1', 'Item 1', 100.00);
const item2 = new OrderItem('2', 'Item 2', 200.00);

const order = new Orders('1', '10', [item1, item2]);
