import AppBuilder from "./AppBuilder";
import GreetingsController from "./controllers/GreetingsController";
import CalculadoraController from "./controllers/CalculadoraController";

const appBuilder = new AppBuilder();

const greetingsController = new GreetingsController();
const calculadoraController = new CalculadoraController();

appBuilder.registerController(greetingsController);
appBuilder.registerController(calculadoraController);

const app = appBuilder.getApp();

export default app;
