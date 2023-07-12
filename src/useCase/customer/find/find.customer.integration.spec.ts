import { Sequelize } from "sequelize-typescript";
import CustumerModel from "../../../infrastructure/customer/repository/sequelize/custumer.model";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Custumer from "../../../domain/customer/entity/custumers";
import Address from "../../../domain/customer/value-object/address";
import CustumerRepository from "../../../infrastructure/customer/repository/sequelize/custumer.repository";
import FindCustomerUserCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequileze.addModels([CustumerModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustumerRepository();
        const useCase = new FindCustomerUserCase(customerRepository);

        const customer = new Custumer("123", "Vitao");
        const address = new Address("street", "city", "state", "zip", "br");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: "123"
        }

        const output = {
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
    })
})
