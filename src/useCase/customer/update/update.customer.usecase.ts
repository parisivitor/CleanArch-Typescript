import CustumerRepositoryInterface from "../../../domain/customer/repository/custumer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";

export default class UpdateCustomerUserCase {
    private customerRepository: CustumerRepositoryInterface;

    constructor(customerRepository: CustumerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(
            new Address(
                input.address.street,
                input.address.city,
                input.address.state,
                input.address.zip_code,
                input.address.country
            )
        );
        await this.customerRepository.update(customer);

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
        };
    }
}
