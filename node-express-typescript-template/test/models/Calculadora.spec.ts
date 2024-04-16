import expect from "expect";
import Calculadora from "../../src/models/Calculadora";

describe("Calculadora test", () => {
    it("should return the sum of two numbers", () => {
        const calculadora = new Calculadora();
        const resultado = calculadora.suma(5, 3);
        expect(resultado).toBe(8);
    });
});
