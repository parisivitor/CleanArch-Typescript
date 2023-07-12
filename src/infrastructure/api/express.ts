import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustumerModel from "../customer/repository/sequelize/custumer.model";
import { customerRoute } from "./routes/customer/customer.routes";


export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory',
        logging: false,

    });
    await sequelize.addModels([CustumerModel]);
    await sequelize.sync();
}
setupDb();
