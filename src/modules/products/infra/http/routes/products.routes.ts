import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.get("/", productsController.index);
productsRoutes.get("/searsh", productsController.searsh);
productsRoutes.delete("/:id", productsController.delete);



export { productsRoutes };