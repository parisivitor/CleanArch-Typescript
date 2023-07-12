export interface InputFindCustomerDTO {
    id: string;
}

export interface OutputFindCustomerDTO {
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
