import { InputCreateCustomerDTO } from "../../../useCase/customer/create/create.custome.dto";
import { app, sequelize } from "../express"
import request from "supertest"
describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const input: InputCreateCustomerDTO = {
            name: "Vitor",
            address: {
                street: "street",
                city: "city",
                state: "state",
                zip_code: "zip",
                country: "br",
            }
        }
        const response = await request(app)
            .post("/customer")
            .send(input);

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined;
        expect(response.body.name).toBe(input.name);
        expect(response.body.address.city).toBe(input.address.city);
        expect(response.body.address.street).toBe(input.address.street);
        expect(response.body.address.state).toBe(input.address.state);
        expect(response.body.address.zip_code).toBe(input.address.zip_code);
        expect(response.body.address.country).toBe(input.address.country);
    });

    it("should not create a customer", async () => {
        const response = await request(app)
        .post("/customer")
        .send({
            nome: "Vitor"
        });
        expect(response.status).toBe(500);
    });

    it("should list all customer", async () => {
        const input: InputCreateCustomerDTO = {
            name: "Vitor",
            address: {
                street: "street",
                city: "city",
                state: "state",
                zip_code: "zip",
                country: "br",
            }
        }
        const response = await request(app).post("/customer").send(input);
        expect(response.status).toBe(200);
        const input2: InputCreateCustomerDTO = {
            name: "Carol",
            address: {
                street: "street2",
                city: "city2",
                state: "state2",
                zip_code: "zip2",
                country: "br2",
            }
        }
        const response2 = await request(app).post("/customer").send(input2);
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        expect(listResponse.body.customers[0].name).toBe(input.name)
        expect(listResponse.body.customers[0].address.street).toBe(input.address.street)

        expect(listResponse.body.customers[1].name).toBe(input2.name)
        expect(listResponse.body.customers[1].address.city).toBe(input2.address.city)

        const listResponseXML = await request(app)
        .get("/customer")
        .set("Accept", "application/xml")
        .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>Vitor</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>street</street>`);
        expect(listResponseXML.text).toContain(`<city>city</city>`);
        expect(listResponseXML.text).toContain(`<state>state</state>`);
        expect(listResponseXML.text).toContain(`<zip_code>zip</zip_code>`);
        expect(listResponseXML.text).toContain(`<country>br</country>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>Carol</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>street2</street>`);
        expect(listResponseXML.text).toContain(`<city>city2</city>`);
        expect(listResponseXML.text).toContain(`<state>state2</state>`);
        expect(listResponseXML.text).toContain(`<zip_code>zip2</zip_code>`);
        expect(listResponseXML.text).toContain(`<country>br2</country>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`</customers>`);


    });
});
