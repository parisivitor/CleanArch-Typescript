import OrderItemModel from "./order-item.model";
import Orders from "../../../../domain/checkout/entity/orders";
import OrderModel from "./order.model";

export default class OrderRepository {
    async create(entity: Orders): Promise<void> {

        await OrderModel.create({
            id: entity.id,
            custumer_id: entity.custumerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
        {
            include: [{model: OrderItemModel}]
        });
    }

    // async update(entity: Custumer): Promise<void> {

    //     await CustumerModel.update(
    //         {
    //             id: entity.id,
    //             name: entity.name,
    //             street: entity.address.state,
    //             zipcode: entity.address.zip_code,
    //             city: entity.address.city,
    //             country: entity.address.country,
    //             state: entity.address.state,
    //             rewardPoints: entity.rewardPoints,
    //             active: entity.active
    //         },
    //         {
    //             where: {
    //                 id: entity.id
    //             }
    //         }
    //     )
    // }

    // async find(id: string): Promise<Custumer> {

    //     let costumerModel;
    //     try{

    //         costumerModel =  await CustumerModel.findOne({ where: { id: id }, rejectOnEmpty: true });
    //     } catch(error) {
    //         throw new Error("Custumer not found");
    //     }

    //     const custumer = new Custumer(costumerModel.id, costumerModel.name);
    //     custumer.Address = new Address(costumerModel.street, costumerModel.city, costumerModel.state, costumerModel.zipcode, costumerModel.country);
    //     custumer.addRewardPoints(costumerModel.rewardPoints)
    //     if (costumerModel.active){
    //         custumer.activate();
    //     }
    //     return custumer;
    // }

    // async findAll(): Promise<Custumer[]> {
    //     const custumerModels = await CustumerModel.findAll();
    //     return custumerModels.map((custumerModel) => {
    //         let custumer = new Custumer(custumerModel.id, custumerModel.name, new Address(custumerModel.state, custumerModel.city, custumerModel.state, custumerModel.zipcode, custumerModel.country))
    //         custumer.addRewardPoints(custumerModel.rewardPoints)
    //         if (custumerModel.active){
    //             custumer.activate();
    //         }
    //         return custumer;

    //     });
    // }

}
