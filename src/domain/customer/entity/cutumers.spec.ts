import Address from "../value-object/address";
import Custumer from "./custumers";

describe("Custumer unit test", () => {

    it("should trow error when id is empty", () => {
        expect(() => {
            let custumer = new Custumer("", "Vitor");
        }).toThrowError("customer: Id is required");
    })

    it("should trow error when name is empty", () => {
        expect(() => {
            let custumer = new Custumer("1", "");
        }).toThrowError('customer: Name is required,customer: Name isn`t lower than 4');
    })

    it("should trow error when change name with name empty", () => {
        expect(() => {
            const custumer = new Custumer("1", "vitor");
            custumer.changeName("");
        }).toThrowError('customer: Name is required,customer: Name isn`t lower than 4');
    })

    it("should change name", () => { //triple A
        // Arrange
        const custumer = new Custumer("1", "vitor");
        // Act
        custumer.changeName("carolina");
        // Assert
        expect(custumer.name).toBe('carolina');
    })

    it("should activate custumer", () => {
        const custumer = new Custumer("1", "vitao");
        const address = new Address("1", "2", "3", "4", "a");
        custumer.Address = address

        custumer.activate();

        expect(custumer.isActive()).toBe(true)
    })
    it("should throw error when address is undefined when activate custumer", () => {
        const custumer = new Custumer("1", "vitao");

        expect( () => {
            custumer.activate()
        }).toThrowError("Address is mandatory to activate a custumer")

    })

    it("should deactivate custumer", () => {
        const custumer = new Custumer("1", "vitao");
        const address = new Address("1", "2", "3", "4", "a");
        custumer.Address = address

        custumer.deactivate();

        expect(custumer.isActive()).toBe(false)
    })

    it("should new custumer has be 0 reward points", () => {
        const custumer = new Custumer("1", "vitao");
        expect(custumer.rewardPoints).toBe(0);
    })

    it("should add reward points", () => {
        const custumer = new Custumer("1", "vitao");
        custumer.addRewardPoints(10);
        expect(custumer.rewardPoints).toBe(10);

        custumer.addRewardPoints(10);
        expect(custumer.rewardPoints).toBe(20);
    })
});
