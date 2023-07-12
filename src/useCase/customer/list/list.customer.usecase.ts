import Custumer from "../../../domain/customer/entity/custumers";
import CustumerRepositoryInterface from "../../../domain/customer/repository/custumer-repository.interface";
import { InputListCustomerDTO, OutputListCustomerDTO } from "./list.customer.dto";

export default class ListCustomerUserCase {
    private customerRepository: CustumerRepositoryInterface;

    constructor(customerRepository: CustumerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
        const customers = await this.customerRepository.findAll();

        return OutputMapper.toOutout(customers)
    }
}

class OutputMapper {
    static toOutout(customer: Custumer[]): OutputListCustomerDTO {
        return {
            customers: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    city: customer.address.city,
                    state: customer.address.state,
                    zip_code: customer.address.zip_code,
                    country: customer.address.country
                }
            }))
        }
    }
}
