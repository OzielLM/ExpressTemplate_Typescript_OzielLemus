import { Request, Response } from "express";
import Controller from "./Controller";
import { StatusCodes } from "http-status-codes";
import Calculadora from "../models/Calculadora";

export default class CalculadoraController extends Controller {
    public constructor() {
        super("/calculadora");
    }

    protected initializeRouter(): void {
        this.router.get("/suma/:x/:y", this.calcularSuma.bind(this));
    }

    private calcularSuma(req: Request, res: Response) {
        try {
            const x = parseFloat(req.params.x);
            const y = parseFloat(req.params.y);

            if (isNaN(x) || isNaN(y)) {
                res.status(StatusCodes.BAD_REQUEST).end();
                return;
            }

            const calculadora = new Calculadora();
            const resultado = calculadora.suma(x, y);
            res.status(StatusCodes.OK).json({ resultado });
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
