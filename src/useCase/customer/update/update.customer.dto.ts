export interface InputUpdateCustomerDTO {
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

export interface OutputUpdateCustomerDTO {
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
