export interface InputListCustomerDTO {}

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
}

export interface OutputListCustomerDTO {
    customers: Customer[];
}
