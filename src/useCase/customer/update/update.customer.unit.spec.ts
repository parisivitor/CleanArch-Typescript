import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDTO } from "./update.customer.dto";
import UpdateCustomerUserCase from "./update.customer.usecase";

const address = new Address("street", "city", "state", "zip", "br");
const customer = CustomerFactory.createWithAddress("Vitao", address);

const input: InputUpdateCustomerDTO = {
    id: customer.id,
    name: "Vitao updated",
    address: {
        street: "street updated",
        city: "city updated",
        state: "state updated",
        zip_code: "zip updated",
        country: "br updated"
    }
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test for customer update use case", () => {

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpadateUseCase = new UpdateCustomerUserCase(customerRepository)

        const output = await customerUpadateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new UpdateCustomerUserCase(customerRepository);

        input.name = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("customer: Name is required,customer: Name isn`t lower than 4");
    });

    // it("should throw an error when street is missing", async () => {
    //     const customerRepository = MockRepository();
    //     const customerCreateUseCase = new UpdateCustomerUserCase(customerRepository);
    //     input.name = "Vitao updated"
    //     input.address.street = "";
    //     await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("Street is required");
    // });

});
