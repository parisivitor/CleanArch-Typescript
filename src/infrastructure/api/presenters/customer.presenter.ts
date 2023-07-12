import { toXML } from "jstoxml"
import { OutputListCustomerDTO } from "../../../useCase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static listXML(data: OutputListCustomerDTO): string {
        const xmlOptions = {
            header: true,
            indent: " ",
            newline: "\n",
            allowEmpty: true
        }

        return toXML(
            {
                customers: {
                    customer: data.customers.map((customer) => ({
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
                },
            },
            xmlOptions
        );
    };
};
