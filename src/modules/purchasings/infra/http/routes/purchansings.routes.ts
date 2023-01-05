import { Router } from "express";
import { PurchasingsController } from "../controllers/PurchasingController";


const purchasingsRoutes = Router();

const purchasingsController = new PurchasingsController();
purchasingsRoutes.get('/', purchasingsController.index);
purchasingsRoutes.post('/', purchasingsController.create);
purchasingsRoutes.put('/:id', purchasingsController.update);
purchasingsRoutes.delete('/:id', purchasingsController.delete);


export { purchasingsRoutes };