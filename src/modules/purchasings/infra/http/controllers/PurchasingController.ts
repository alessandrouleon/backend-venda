import { CreatePurchasingsService } from "@modules/purchasings/services/CreatePurchasingsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class PurchasingsController {

    async create(request: Request, response: Response): Promise<Response> {
        const { id_product, tools } = request.body;
        let purchansing = [];

        for (const item of tools) {
            const data = { id_product: Number(id_product), ...item };
            const purchasing = container.resolve(CreatePurchasingsService);
            await purchasing.execute(data);
            purchansing.push(data);
        };

        return response.status(201).json(purchansing);
    }
}

export { PurchasingsController }