import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Greeting from "../models/Greeting";
import Controller from "./Controller";

export default class GreetingsController extends Controller {
    public constructor() {
        super("/greetings");
    }

    protected initializeRouter(): void {
        this.router.get("/hello", this.sayHello);
    }

    private sayHello(req: Request, res: Response): void {
        try {
            const greeting = new Greeting();
            const message = greeting.sayHello();
            res.status(StatusCodes.OK).json({ message });
        } catch (e) {
            console.error(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
}
