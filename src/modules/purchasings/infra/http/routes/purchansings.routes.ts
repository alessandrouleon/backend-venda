import { Router } from "express";
import { PurchasingsController } from "../controllers/PurchasingController";


const purchasingsRoutes = Router();

const purchasingsController = new PurchasingsController();
purchasingsRoutes.post('/', purchasingsController.create);

export { purchasingsRoutes };