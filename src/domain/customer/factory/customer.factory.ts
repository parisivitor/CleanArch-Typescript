import Custumer from "../entity/custumers";
import { v4 as uuid } from "uuid"
import Address from "../value-object/address";

export default class CustomerFactory {
    public static create(name: string): Custumer{
        return new Custumer(uuid(), name);
    }

    public static createWithAddress(name: string, address: Address): Custumer{
        const customer = new Custumer(uuid(), name);
        customer.changeAddress(address)
        return customer;
    }
}
