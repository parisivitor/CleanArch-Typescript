import { Column, PrimaryKey, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import CustumerModel from "../../../customer/repository/sequelize/custumer.model";
import OrderItemModel from "./order-item.model";


@Table({
    tableName: "orders",
    timestamps: false
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustumerModel)
    @Column({ allowNull: false })
    declare custumer_id: string;

    @BelongsTo(() => CustumerModel)
    declare custumer: CustumerModel;

    @HasMany(() => OrderItemModel)
    declare items: typeof OrderItemModel[];

    @Column({ allowNull: false })
    declare total: number;
}
