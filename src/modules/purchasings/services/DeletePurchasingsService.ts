import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IPurchasingsRepository } from "../repositories/IPurchasingsRepository";

@injectable()
class DeletePurchasingsService {

    constructor(
        @inject('PurchasingsRepository')
        private purchasingsRepository: IPurchasingsRepository
    ) { }

    public async execute(id: number): Promise<void> {
        const purchansing = await this.purchasingsRepository.findById(id);
        if (!purchansing) {
            throw new AppError(`This ${id} does not exists!`);
        }

        await this.purchasingsRepository.delete(id);
    }
}

export { DeletePurchasingsService }