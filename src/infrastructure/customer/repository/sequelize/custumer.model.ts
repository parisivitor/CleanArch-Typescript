import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";


@Table({
    tableName: "custumers",
    timestamps: false,
})
export default class CustumerModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare zipcode: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare country: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare rewardPoints: number;

    @Column({ allowNull: false })
    declare active: boolean;
}
