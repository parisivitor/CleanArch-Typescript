import { Sequelize } from 'sequelize-typescript';
import CustumerModel from './custumer.model';
import Custumer from '../../../../domain/customer/entity/custumers';
import Address from '../../../../domain/customer/value-object/address';
import CustumerRepository from './custumer.repository';

describe("Product repository test", () => {
    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequileze.addModels([CustumerModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should create a custumer", async () => {
        const custumerRepository = new CustumerRepository();
        const custumer = new Custumer("1", "custumer 1");
        custumer.Address = new Address("s1", "c1", "s1", "zip1", "country1");
        custumer.addRewardPoints(20);
        custumer.activate();
        await custumerRepository.create(custumer);

        const custumerModel = await CustumerModel.findOne({ where: { id: "1" } })

        expect(custumerModel.toJSON()).toStrictEqual({
            id: custumer.id,
            name: custumer.name,
            street: custumer.address.street,
            city: custumer.address.city,
            state: custumer.address.state,
            zipcode: custumer.address.zip_code,
            country: custumer.address.country,
            rewardPoints: custumer.rewardPoints,
            active: custumer.active
        });
    })


    it("sould update a custumer", async () => {
        const custumerRepository = new CustumerRepository();
        const custumer = new Custumer("1", "custumer 1");
        custumer.Address = new Address("s1", "c1", "s1", "zip1", "country1")
        await custumerRepository.create(custumer);

        const custumerModel = await CustumerModel.findOne({ where: { id: "1" } })
        expect(custumerModel.toJSON()).toStrictEqual({
            id: custumer.id,
            name: custumer.name,
            street: custumer.address.street,
            city: custumer.address.city,
            state: custumer.address.state,
            zipcode: custumer.address.zip_code,
            country: custumer.address.country,
            rewardPoints: custumer.rewardPoints,
            active: custumer.active
        });

        custumer.changeName('new custumer 1');
        custumer.Address = new Address("s2", "c2", "s2", "zip2", "country2")

        await custumerRepository.update(custumer);

        const newCustumerModel = await CustumerModel.findOne({ where: { id: "1" } })
        expect(newCustumerModel.toJSON()).toStrictEqual({
            id: custumer.id,
            name: custumer.name,
            street: custumer.address.street,
            city: custumer.address.city,
            state: custumer.address.state,
            zipcode: custumer.address.zip_code,
            country: custumer.address.country,
            rewardPoints: custumer.rewardPoints,
            active: custumer.active
        });
    })

    it("should find a custumer", async () => {
        const custumerRepository = new CustumerRepository();
        const custumer = new Custumer("1", "custumer 1");
        custumer.Address = new Address("s1", "c1", "s1", "zip1", "country1");
        await custumerRepository.create(custumer);

        const custumerModel = await CustumerModel.findOne({ where: { id: "1" } })

        const foundCustumer = await custumerRepository.find("1");

        expect(custumerModel.toJSON()).toStrictEqual({
            id: foundCustumer.id,
            name: foundCustumer.name,
            street: foundCustumer.address.street,
            city: foundCustumer.address.city,
            state: foundCustumer.address.state,
            zipcode: foundCustumer.address.zip_code,
            country: foundCustumer.address.country,
            rewardPoints: foundCustumer.rewardPoints,
            active: custumer.active
        });
    })

    it("sould find all custumers", async () => {
        const custumerRepository = new CustumerRepository();

        const custumer = new Custumer("1", "custumer 1");
        custumer.Address = new Address("s1", "c1", "s1", "zip1", "country1")
        custumer.addRewardPoints(10);
        custumer.activate();
        await custumerRepository.create(custumer);

        const custumer2 = new Custumer("2", "custumer 2");
        custumer2.Address = new Address("s2", "c2", "s2", "zip2", "country2")
        await custumerRepository.create(custumer2);

        const custumer3 = new Custumer("3", "custumer 3");
        custumer3.Address = new Address("s3", "c3", "s3", "zip3", "country3")
        custumer3.activate();
        await custumerRepository.create(custumer3);

        const foundCustumers = await custumerRepository.findAll();
        const custumers = [custumer, custumer2, custumer3];

        expect(custumers).toEqual(foundCustumers);
    })
});
