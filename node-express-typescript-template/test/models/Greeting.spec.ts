import Greeting from "../../src/models/Greeting";
import expect from "expect";

describe("Greeting tests", () => {
    it("should return 'Hello world!' when sayHello is called", () => {
        const greeting = new Greeting();
        const message = greeting.sayHello();
        expect(message).toBe("Hello world!");
    });
});
