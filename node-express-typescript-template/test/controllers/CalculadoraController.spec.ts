import Sinon from "sinon";
import expect from "expect";
import request from "supertest";
import app from "../../src/app";
import { StatusCodes } from "http-status-codes";
import * as calculadoraModule from "../../src/models/Calculadora";

describe("CalculadoraController tests", () => {
    let sandbox: Sinon.SinonSandbox;
    let calculadoraStubbedInstance: Sinon.SinonStubbedInstance<calculadoraModule.default>;
    let calculadoraConstructorStub: Sinon.SinonStub;

    before(() => {
        sandbox = Sinon.createSandbox();
    });

    beforeEach(() => {
        calculadoraStubbedInstance = sandbox.createStubInstance(
            calculadoraModule.default
        );
        calculadoraConstructorStub = sandbox.stub(calculadoraModule, "default");
        calculadoraConstructorStub.returns(calculadoraStubbedInstance);
    });

    afterEach(() => {
        sandbox.restore();
    });

    context("GET /calculadora/suma/:x/:y", () => {
        it("should respond 200 OK and return the result", async () => {
            calculadoraStubbedInstance.suma.returns(5);

            const response = await request(app)
                .get("/calculadora/suma/2/3")
                .expect(StatusCodes.OK)
                .expect("Content-Type", /json/);

            const { resultado } = response.body;

            expect(resultado).toBe(5);
        });

        it("should respnd 400 Bad Request when things that pass in the URL are not a number", async () => {
            await request(app)
                .get("/calculadora/suma/abc/5")
                .expect(StatusCodes.BAD_REQUEST);

            await request(app)
                .get("/calculadora/suma/3/xyz")
                .expect(StatusCodes.BAD_REQUEST);
        });

        it("should respond 500 Internal Server Error when is called and error ocurred", async () => {
            calculadoraStubbedInstance.suma.throws(
                new Error("I am Inevitable")
            );

            // await request(app)
            //     .get("/calculadora/suma/5/6")
            //     .expect(StatusCodes.INTERNAL_SERVER_ERROR);
        });
    });
});
