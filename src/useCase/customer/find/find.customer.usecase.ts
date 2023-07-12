import CustumerRepositoryInterface from "../../../domain/customer/repository/custumer-repository.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer.dto";

export default class FindCustomerUserCase {
    private customerRepository: CustumerRepositoryInterface;

    constructor(customerRepository: CustumerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
        const customer = await this.customerRepository.find(input.id);

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
