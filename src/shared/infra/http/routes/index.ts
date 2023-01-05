import { Router } from "express";
import { productsRoutes } from "@modules/products/infra/http/routes/products.routes";
import { purchasingsRoutes } from "@modules/purchasings/infra/http/routes/purchansings.routes";
const routes = Router();

routes.use("/products", productsRoutes);
routes.use("/purchasings", purchasingsRoutes);

export { routes };