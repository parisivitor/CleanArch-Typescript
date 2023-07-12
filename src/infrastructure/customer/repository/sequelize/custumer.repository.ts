import Custumer from "../../../../domain/customer/entity/custumers";
import CustumerRepositoryInterface from "../../../../domain/customer/repository/custumer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustumerModel from "./custumer.model";

export default class CustumerRepository implements CustumerRepositoryInterface {
    async create(entity: Custumer): Promise<void> {

        await CustumerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            zipcode: entity.address.zip_code,
            city: entity.address.city,
            country: entity.address.country,
            state: entity.address.state,
            rewardPoints: entity.rewardPoints,
            active: entity.active
        })
    }

    async update(entity: Custumer): Promise<void> {

        await CustumerModel.update(
            {
                id: entity.id,
                name: entity.name,
                street: entity.address.street,
                zipcode: entity.address.zip_code,
                city: entity.address.city,
                country: entity.address.country,
                state: entity.address.state,
                rewardPoints: entity.rewardPoints,
                active: entity.active
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }

    async find(id: string): Promise<Custumer> {

        let costumerModel;
        try{
            costumerModel =  await CustumerModel.findOne({ where: { id: id }, rejectOnEmpty: true });
        } catch(error) {
            throw new Error("Custumer not found");
        }

        const custumer = new Custumer(costumerModel.id, costumerModel.name);
        custumer.Address = new Address(costumerModel.street, costumerModel.city, costumerModel.state, costumerModel.zipcode, costumerModel.country);
        custumer.addRewardPoints(costumerModel.rewardPoints)
        if (costumerModel.active){
            custumer.activate();
        }
        return custumer;
    }

    async findAll(): Promise<Custumer[]> {
        const custumerModels = await CustumerModel.findAll();
        return custumerModels.map((custumerModel) => {
            let custumer = new Custumer(custumerModel.id, custumerModel.name, new Address(custumerModel.street, custumerModel.city, custumerModel.state, custumerModel.zipcode, custumerModel.country))
            custumer.addRewardPoints(custumerModel.rewardPoints)
            if (custumerModel.active){
                custumer.activate();
            }
            return custumer;

        });
    }

}
