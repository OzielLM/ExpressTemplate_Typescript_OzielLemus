import { Router } from "express";

export interface IController {
    basePath: string;
    router: Router;
}

export default abstract class Controller implements IController {
    public basePath: string;

    public router: Router;

    public constructor(basePath: string) {
        this.basePath = basePath;
        this.router = Router();
        this.initializeRouter();
    }

    protected abstract initializeRouter(): void;
}
