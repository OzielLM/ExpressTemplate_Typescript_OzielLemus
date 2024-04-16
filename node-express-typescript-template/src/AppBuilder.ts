import { Application } from "express";
import { IController } from "./controllers/Controller";
import expressWrapper from "./expressWrapper";

export default class AppBuilder {
    private app: Application;

    public constructor() {
        this.app = expressWrapper();
    }

    public getApp(): Application {
        return this.app;
    }

    public registerController(controller: IController): AppBuilder {
        const { basePath, router } = controller;

        this.app.use(basePath, router);

        return this;
    }
}
