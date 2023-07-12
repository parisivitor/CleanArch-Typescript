import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.custome.dto";
import CreateCustomerUseCase from "./create.customer.usecase";

const input: InputCreateCustomerDTO = {
    name: "Vitor",
    address: {
        street: "street",
        city: "city",
        state: "state",
        zip_code: "zip_code",
        country: "country",
    }
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit test create customer use case", () => {
    it("should create a customer", async() => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                state: input.address.state,
                zip_code: input.address.zip_code,
                country: input.address.country,
            }
        });
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("customer: Name is required,customer: Name isn`t lower than 4");
    });

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("Street is required");
    });
});
