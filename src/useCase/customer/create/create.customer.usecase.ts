import CustumerRepositoryInterface from "../../../domain/customer/repository/custumer-repository.interface";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.custome.dto";
import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

export default class CreateCustomerUseCase {
    private customerRepository: CustumerRepositoryInterface;

    constructor(customerRepository: CustumerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
        const customer = CustomerFactory.createWithAddress(
            input.name,
            new Address(
                input.address.street,
                input.address.city,
                input.address.state,
                input.address.zip_code,
                input.address.country
            )
        );

        await this.customerRepository.create(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                state: customer.address.state,
                zip_code: customer.address.zip_code,
                country: customer.address.country
            }
        }
    }
}
