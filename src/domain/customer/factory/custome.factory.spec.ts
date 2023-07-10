import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {


    it("should create a customer", () => {
        let customer = CustomerFactory.create("Vitao");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Vitao");
        expect(customer.Address).toBeUndefined();
        expect(customer.constructor.name).toBe("Custumer");
    });

    it("should create a customer with address", () => {
        let address =new Address('s', 'c', 's', 'z', 'c')
        let customer = CustomerFactory.createWithAddress("Vitao", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Vitao");
        expect(customer.address).toBe(address);
        expect(customer.constructor.name).toBe("Custumer");
    });
});
