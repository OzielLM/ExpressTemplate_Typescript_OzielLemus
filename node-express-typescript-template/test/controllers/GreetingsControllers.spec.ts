import Sinon from "sinon";
import expect from "expect";
import request from "supertest";
import app from "../../src/app";
import { StatusCodes } from "http-status-codes";
import * as greetingModule from "../../src/models/Greeting";

describe("GreetingsControllers", () => {
    let sandbox: Sinon.SinonSandbox;
    let greetingStubbedInstance: Sinon.SinonStubbedInstance<greetingModule.default>;
    let constructorStub: Sinon.SinonStub;

    before(() => {
        sandbox = Sinon.createSandbox();
        greetingStubbedInstance = sandbox.createStubInstance(
            greetingModule.default
        );

        constructorStub = sandbox.stub(greetingModule, "default");
        constructorStub.returns(greetingStubbedInstance);
    });

    after(() => {
        sandbox.restore();
    });

    it("should respond 200 OK when GET /greetings/hello is called", async () => {
        const message = "I am Iron man"; //Configuracion
        greetingStubbedInstance.sayHello.returns(message);

        const response = await request(app)
            .get("/greetings/hello")
            .expect("Content-Type", /json/)
            .expect(StatusCodes.OK); //Ejecucion
        const responseBody = response.body;

        expect(responseBody).toEqual({ message }); //Validacion
        expect(constructorStub.calledOnce).toBeTruthy();
        expect(greetingStubbedInstance.sayHello.callCount).toBe(1);
    });

    it("should respond 500 Internal Server Error when GET /greetings/hello is called and error occurred", async () => {
        greetingStubbedInstance.sayHello.throws(new Error("I am Inevitable"));

        await request(app)
            .get("/greetings/hello")
            .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });
});
