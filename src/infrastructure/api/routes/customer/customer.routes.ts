import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../../useCase/customer/create/create.customer.usecase";
import CustumerRepository from "../../../customer/repository/sequelize/custumer.repository";
import { InputCreateCustomerDTO } from "../../../../useCase/customer/create/create.custome.dto";
import { InputListCustomerDTO } from "../../../../useCase/customer/list/list.customer.dto";
import ListCustomerUserCase from "../../../../useCase/customer/list/list.customer.usecase";
import CustomerPresenter from "../../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustumerRepository());
    try {
        const customerDTO: InputCreateCustomerDTO = { ...req.body }

        const output = await usecase.execute(customerDTO);
        res.send(output);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

customerRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListCustomerUserCase(new CustumerRepository());
    try {
        const customerDTO: InputListCustomerDTO = { ...req.body }
        const output = await usecase.execute(customerDTO);

        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(CustomerPresenter.listXML(output))
        })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})
