import Custumer from "../../../domain/customer/entity/custumers";
import Address from "../../../domain/customer/value-object/address";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer.dto";
import FindCustomerUserCase from "./find.customer.usecase";

const customer = new Custumer("123", "Vitao");
const address = new Address("street", "city", "state", "zip", "br");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test find customer use case", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUserCase(customerRepository)
        await customerRepository.create(customer);

        const input: InputFindCustomerDTO = {
            id: "1234"
        }

        const output: OutputFindCustomerDTO = {
            id: "123",
            name: "Vitao",
            address: {
                street: "street",
                city: "city",
                state: "state",
                zip_code: "zip",
                country: "br",
            }
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });

    it("should be not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const useCase = new FindCustomerUserCase(customerRepository)
        await customerRepository.create(customer);

        const input = {
            id: "123"
        }

        expect(() => {
            return useCase.execute(input)
        }).rejects.toThrow("Customer not found");
    });
});
