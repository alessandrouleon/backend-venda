import { CreatePurchasingsService } from "@modules/purchasings/services/CreatePurchasingsService";
import { DeletePurchasingsService } from "@modules/purchasings/services/DeletePurchasingsService";
import { UpdatePurchasingsService } from "@modules/purchasings/services/UpdatePurchasingsService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { PurchasingsRepository } from "../../typeorm/repositories/PurchasingsRepository";

class PurchasingsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const purchansingRepository = new PurchasingsRepository();

        const { page } = request.query;
        const { purchasing, totalPurchasings, totalPages } = await purchansingRepository.findAllPaginatedPurchasings(Number(page));

        return response.json({
            purchasing,
            totalPurchasings,
            totalPages
        });
    }
















    public async create(request: Request, response: Response): Promise<Response> {
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

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const data = request.body;

        const purchansingUpdate = container.resolve(UpdatePurchasingsService);
        const purchansing = await purchansingUpdate.execute({
            id: Number(id),
            ...data
        });

        return response.status(201).json(purchansing);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const purchansingDelete = container.resolve(DeletePurchasingsService);
        await purchansingDelete.execute(Number(id));

        return response.status(201).send();
    }
}

export { PurchasingsController }