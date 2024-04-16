import AppBuilder from "../src/AppBuilder";
import Sinon from "sinon";
import * as expressWrapperModule from "../src/expressWrapper";
import expect from "expect";
import { IController } from "../src/controllers/Controller";
import { Router } from "express";

describe("AppBuilder test", () => {
    let sandbox: Sinon.SinonSandbox;
    let expressWrapperStub: Sinon.SinonStub;
    let fakeApp: {
        use: Sinon.SinonStub;
    };

    before(() => {
        sandbox = Sinon.createSandbox();
        expressWrapperStub = sandbox.stub(expressWrapperModule, "default");
        fakeApp = {
            use: sandbox.stub(),
        };
        expressWrapperStub.returns(fakeApp);
    });

    after(() => {
        sandbox.restore();
    });

    it("should build an app", () => {
        const appBuilder = new AppBuilder();
        const app = appBuilder.getApp();

        expect(app).toEqual(fakeApp);
        expect(expressWrapperStub.callCount).toBe(1);
    });

    it("should register multiple controllers", () => {
        const controller1: IController = {
            basePath: "/controller1path",
            router: { fakeRouter: 1 } as unknown as Router,
        };

        const controller2: IController = {
            basePath: "/controller2path",
            router: { fakeRouter: 2 } as unknown as Router,
        };

        const appBuilder = new AppBuilder();

        appBuilder.registerController(controller1);
        appBuilder.registerController(controller2);

        expect(fakeApp.use.callCount).toBe(2);
        expect(fakeApp.use.firstCall.firstArg).toBe(controller1.basePath);
        expect(fakeApp.use.firstCall.lastArg).toBe(controller1.router);
        expect(fakeApp.use.getCall(1).args[0]).toBe(controller2.basePath);
        expect(fakeApp.use.getCall(1).args[1]).toBe(controller2.router);
    });
});
