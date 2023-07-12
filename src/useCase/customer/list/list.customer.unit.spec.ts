import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUserCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Vitor",
    new Address("street", "city", "state", "zip_code", "br")
);

const customer2 = CustomerFactory.createWithAddress(
    "Vitor2",
    new Address("street2", "city2", "state2", "zip_code2", "dale2")
);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for listing customer use case", () => {

    it("should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new ListCustomerUserCase(repository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });
});
